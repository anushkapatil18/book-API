const PublicationModel = require('../schema/publication');
const BookModel = require('../schema/book');

const Router = require('express').Router();


// Route    - /publication
// Des      - to get all publication
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none
Router.get("/publication",async (req,res) => {
    const getAllPublication = await PublicationModel.find();
    return res.json(getAllPublication);
});

// Route    - /publication/:id
// Des      - To get a book based on ISBN
// Access   - Public
// Method   - GET
// Params   - bookID
// Body     - none
Router.get("/publication/:id",async (req,res) => {
    const getSpecificPublication = await PublicationModelM.findOne({id: req.params.id});
    if(!getSpecificPublication){
        return res.json({
            error: `No publication found for the ISBN of ${req.params.id}`,
        });
    }
    return res.json({publication: getSpecificPublication});
});

// Route    - /publication/p/:nam
// Des      - to get a list of books based on category
// Access   - Public
// Method   - GET
// Params   - category
// Body     - none
Router.get("/publication/p/:nam",async (req,res) => {
    const getSpecificPublication = await PublicationModel.findOne({name: req.params.nam});
    if(!getSpecificPublication){
        return res.json({
            error: `No publication found for the ISBN of ${req.params.nam}`,
        });
    }
    return res.json({publication: getSpecificPublication});
});





// Route    - /publication/new
// Des      - to add new publication
// Access   - Public
// Method   - POST
// Params   - none
// Body     - none
Router.post("/publication/new",async(req,res) => {
    try{
        const{newPublication} = req.body;
        await PublicationModel.create(newPublication);
        return res.json({message: "Publication added to the database"});
    }catch(error){
        return res.json({error: error.message});
    }
});




// Route    - /publication/update/:id
// Des      - update publication 
// Access   - Public
// Method   - PUT
// Params   - id
// Body     - none
Router.put("/publication/update/:id",async(req,res) => {
    const {books} = req.body.books;
    const updatePub = await PublicationModel.findOneAndUpdate(
        {
            id: req.params.id
        },
        {
            books: books
        },
        {
            new: true
        }
    );
    return res.json({publication: updatePub});
});





// Route    - /publication/delete/id
// Des      - delete a publication
// Access   - Public
// Method   - DELETE
// Params   - id
// Body     - none
Router.delete("/publication/delete/:id",async(req,res) => {
    const {id}=req.params;
    const updatePubDatabase = await PublicationModel.findOneAndDelete(
        { id: parseInt(id)}
    );

    return res.json({publications: updatePubDatabase});
});

// Route    - /publication/delete/book
// Des      - delete a book from a publication
// Access   - Public
// Method   - DELETE
// Params   - id, isbn
// Body     - none
Router.delete("/publication/delete/book/:isbn/:id",async (req,res) => {
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

    const updatePub = await PublicationModel.findOneAndUpdate({
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

    return res.json({message: 'publication was deleted', book: updateBook, publication: updatePub});
});

module.exports = Router;