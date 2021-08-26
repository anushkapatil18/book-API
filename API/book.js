const BookModel = require('../schema/book');
const AuthorModel = require('../schema/author');

const Router = require('express').Router();

// Route    - /book
// Des      - To get all books
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none
Router.get("/book", async (req,res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});

// Route    - /book/:bookID
// Des      - To get a book based on ISBN
// Access   - Public
// Method   - GET
// Params   - bookID
// Body     - none
Router.get("/book/:bookID",async (req,res) => {
    const getSpecificBook = await BookModel.findOne({ISBN: req.params.bookID});
    if(!getSpecificBook){
        return res.json({
            error: `No book found for the ISBN of ${req.params.bookID}`,
        });
    }
    return res.json({book: getSpecificBook});
});

// Route    - /book/c/:catgory
// Des      - to get a list of books based on category
// Access   - Public
// Method   - GET
// Params   - category
// Body     - none
Router.get("/book/c/:category",async (req,res) => {
    const getSpecificBook = await BookModel.find({category: req.params.category});
    if(!getSpecificBook){
        return res.json({
            error: `No book found for the category of ${req.params.category}`,
        });
    }
    return res.json({book: getSpecificBook});
});


// Route    - /book/a/:authors
// Des      -to get a list of books based on author
// Access   - Public
// Method   - GET
// Params   - author
// Body     - none
Router.get("/book/a/:authors", async (req,res) => {
    const getSpBook = await BookModel.find({authors: req.params.authors});
    if(!getSpBook){
        return res.json({
            error: `No book found for the authors of ${req.params.authors}`,
        });
    }
    return res.json({book: getSpBook});
});

// Route    - /book/new
// Des      - add new book
// Access   - Public
// Method   - POST
// Params   - none
// Body     - none
Router.post("/book/new",async(req,res) => {
    try{
        const{newBook} = req.body;
        await BookModel.create(newBook);
        return res.json({message: "Book added to the database"});
    }catch(error){
        return res.json({error: error.message});
    }
});

// Route    - /book/updateTitle/:isbn
// Des      - update title of book
// Access   - Public
// Method   - PUT
// Params   - ISBN
// Body     - none
Router.put("/book/updateTitle/:isbn", async(req,res) => {
    const {title} = req.body.title;
    const updateBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            title: title
        },
        {
            new: true
        }
    );
    return res.json({books: updateBook});
});

// Route    - /book/updateAuthor/:isbn
// Des      - to update/add new author to a book
// Access   - Public
// Method   - PUT
// Params   - ISBN
// Body     - none
Router.put("/book/updateAuthor/:isbn",async (req,res) => {
    const {newAuthor} = req.body;
    const {isbn} = req.params;

    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: isbn
        },
        {
            $addToSet: {
                authors: newAuthor
            }
        },
        {
            new: true
        }
    );
     
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: newAuthor
        },
        {
            $addToSet: {
                books: isbn
            }
        },
        {
            new: true
        }
    );

    return res.json({ books: updatedBook, authors: updatedAuthor, message: 'New author added into the database'});
});

// Route    - /book/delete/:isbn
// Des      - delete a book
// Access   - Public
// Method   - DELETE
// Params   - ISBN
// Body     - none
Router.delete("/book/delete/:isbn" ,async (req,res) => {
    const {isbn} = req.params;
    
    const updateBookDatabase = await BookModel.findOneAndDelete(
        { ISBN: isbn}
    );

    return res.json({books: updateBookDatabase});
});

// Route    - /book/delete/author
// Des      - delete a author from a book
// Access   - Public
// Method   - DELETE
// Params   - id, isbn
// Body     - none
Router.delete("/book/delete/author/:isbn/:id", async(req,res) => {
    const {isbn,id} = req.params;

    const updateBook = await BookModel.findOneAndUpdate({
        ISBN: isbn
    },
    {
        $pull: {
            authors: parseInt(id)
        }
    },
    {
        new: true
    }
    )

    const updateAuthor = await AuthorModel.findOneAndUpdate({
        id: parseInt(id)
    },
    {
        $pull: {
            books: isbn,
        },
    },
    {
        new: true
    }
    )

    return res.json({message: 'Author was deleted', book: updateBook, author: updateAuthor});
});

module.exports = Router;