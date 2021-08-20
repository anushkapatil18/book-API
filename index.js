const express = require("express");

// import the database
const Database = require("./database");

//initialization
const OurApp = express(); //OurApp contains express

OurApp.use(express.json());

//.get is http method "/" is route
OurApp.get("/",(request,response)=>{
    response.json({message: "Server is working!!"}); 

});

// Route    - /book
// Des      - To get all books
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none
OurApp.get("/book",(req,res) => {
    return res.json({books: Database.Book})
});

// Route    - /book/:bookID
// Des      - To get a book based on ISBN
// Access   - Public
// Method   - GET
// Params   - bookID
// Body     - none
OurApp.get("/book/:bookID",(req,res) => {
    const getBook = Database.Book.filter((book) => book.ISBN === req.params.bookID);

    return res.json({books: getBook});
});

// Route    - /book/c/:catgory
// Des      - to get a list of books based on category
// Access   - Public
// Method   - GET
// Params   - category
// Body     - none
OurApp.get("/book/c/:category",(req,res) => {
    const getBook = Database.Book.filter((book) => 
       book.category.includes(req.params.category)
    );

    return res.json({books: getBook});
});


// Route    - /book/a/:authors
// Des      -to get a list of books based on author
// Access   - Public
// Method   - GET
// Params   - author
// Body     - none
OurApp.get("/book/a/:authors",(req,res) => {
    var getBook = Database.Book.filter((book) => 
       book.authors.includes(parseInt(req.params.authors))
    );

    return res.json({books: getBook});
});

// Route    - /author
// Des      - to get all author
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none
OurApp.get("/author",(req,res) => {
    return res.json({author: Database.Author})
});

// Route    - /author/:authorID
// Des      - to get specific author
// Access   - Public
// Method   - GET
// Params   - authorID
// Body     - none
OurApp.get("/author/:authorID",(req,res) => {
    var getBook = Database.Author.filter((author) => author.books === req.params.authorID);

    return res.json({author: getBook});
});


// Route    - /publication
// Des      - to get all publication
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none
OurApp.get("/publication",(req,res) => {
    return res.json({publication: Database.Publication})
});

// Route    - /publication/:id
// Des      - To get a book based on ISBN
// Access   - Public
// Method   - GET
// Params   - bookID
// Body     - none
OurApp.get("/publication/:id",(req,res) => {
    const getBook = Database.Publication.filter((publication) => publication.id === parseInt(req.params.id));

    return res.json({publication: getBook});
});

// Route    - /publication/p/:nam
// Des      - to get a list of books based on category
// Access   - Public
// Method   - GET
// Params   - category
// Body     - none
OurApp.get("/publication/p/:nam",(req,res) => {
    const getBook = Database.Publication.filter((publication) => 
       publication.name === (req.params.nam)
    );

    return res.json({publication: getBook});
});

// Route    - /book/new
// Des      - add new book
// Access   - Public
// Method   - POST
// Params   - none
// Body     - none
OurApp.post("/book/new",(req,res) => {
    const {newBook} = req.body;
    //add new data to database
    Database.Book.push(newBook);

    return res.json(Database.Book);
});

// Route    - /author/new
// Des      - to add new author
// Access   - Public
// Method   - POST
// Params   - none
// Body     - none
OurApp.post("/author/new",(req,res) => {
    const {newAuthor} = req.body;
    
    Database.Author.push(newAuthor);

    return res.json(Database.Author);
});

// Route    - /publication/new
// Des      - to add new publication
// Access   - Public
// Method   - POST
// Params   - none
// Body     - none
OurApp.post("/publication/new",(req,res) => {
    const {newPublication} = req.body;
    
    Database.Publication.push(newPublication);

    return res.json(Database.Publication);
});

// Route    - /book/update/:isbn
// Des      - update details of book
// Access   - Public
// Method   - PUT
// Params   - ISBN
// Body     - none
OurApp.put("/book/update/:isbn",(req,res) => {
    const {updatedBook} = req.body;
    const {isbn} = req.params;

    const book = Database.Book.map((book) => {
        if(book.ISBN === isbn){
            return {...book, ...updatedBook};
        }
        return book;
    });
    return res.json(book);
});

// Route    - /book/update/:isbn
// Des      - to update/add new author
// Access   - Public
// Method   - PUT
// Params   - ISBN
// Body     - none
OurApp.put("/bookAuthor/update/:isbn",(req,res) => {
    const {newAuthor} = req.body;
    const {isbn} = req.params;

    const book = Database.Book.map((book) => {
        if(book.ISBN === isbn){
            if(!book.authors.includes(newAuthor)){
                  return book.authors.push(newAuthor);
            }
            return book;
        }
        return book;
    });
    
    const author = Database.Author.map((author) => {
        if(author.id == newAuthor){
            if(!author.books.includes(isbn)){
                return author.books.push(isbn);
            }
            return author;
        }
        return author;
    })

    return res.json({book: Database.Book, author: Database.Author});
});

// Route    - /author/update/:id
// Des      - update details of author
// Access   - Public
// Method   - PUT
// Params   - id
// Body     - none
OurApp.put("/author/update/:id",(req,res) => {
    const {updatedAuthor} = req.body;
    const {id} = req.params;

    const author = Database.Author.map((author) => {
        if(author.id === parseInt(id)){
            return {...author, ...updatedAuthor};
        }
        return author;
    });
    return res.json(author);
});

// Route    - /publication/update/:id
// Des      - update publication 
// Access   - Public
// Method   - PUT
// Params   - id
// Body     - none
OurApp.put("/publication/update/:id",(req,res) => {
    const {updatedPublication} = req.body;
    const {id} = req.params;

    const publication = Database.Publication.map((publication) => {
        if(publication.id === parseInt(id)){
            return {...publication, ...updatedPublication};
        }
        return publication;
    });
    return res.json(publication);
});

// Route    - /book/delete/:isbn
// Des      - delete a book
// Access   - Public
// Method   - DELETE
// Params   - ISBN
// Body     - none
OurApp.delete("/book/delete/:isbn" ,(req,res) => {
    const {isbn} = req.params;
    const filteredBooks = Database.Book.filter((book) => book.ISBN !== isbn);

    Database.Book = filteredBooks;

    return res.json(Database.Book);
});

// Route    - /book/delete/author
// Des      - delete a author from a book
// Access   - Public
// Method   - DELETE
// Params   - id, isbn
// Body     - none
OurApp.delete("/book/delete/author/:isbn/:id", (req,res) => {
    const {isbn} = req.params;
    const {id} = req.params;

    Database.Book.forEach((book) => {
        if(book.ISBN === isbn){
            if(!book.authors.includes(parseInt(id))){
            return book;
        }
        book.authors = book.authors.filter((databaseId) => databaseId !== parseInt(id));
    
        return book;
       }
    return book;
    });
    Database.Author.forEach((author) => {
        if(author.id === parseInt(id)){
            if(!author.book.includes(isbn)){
                return author;
            }
            author.books = author.books.filter((book) => book !== isbn);
            return author;
        }
        return author;
    })
    return res.json({book: Database.Book, author:Database.Author});
});


// Route    - /author/delete/id
// Des      - delete a author
// Access   - Public
// Method   - DELETE
// Params   - id
// Body     - none
OurApp.delete("/author/delete/:id",(req,res) => {
    const {id}=req.params;
    const filteredAuthors = Database.Author.filter((author) => author.id !== parseInt(id) );

    Database.Author = filteredAuthors;
    return res.json(Database.Author);
});

// Route    - /publication/delete/id
// Des      - delete a publication
// Access   - Public
// Method   - DELETE
// Params   - id
// Body     - none
OurApp.delete("/publication/delete/:id",(req,res) => {
    const {id}=req.params;
    const filteredPublication = Database.Publication.filter((publication) => publication.id !== parseInt(id) );

    Database.Publication = filteredPublication;
    return res.json(Database.Publication);
});

// Route    - /publication/delete/book
// Des      - delete a book from a publication
// Access   - Public
// Method   - DELETE
// Params   - id, isbn
// Body     - none
OurApp.delete("/publication/delete/book/:isbn/:id",(req,res) => {
    const {isbn,id} = req.params;

    Database.Book.forEach((book) => {
        if(book.ISBN === isbn){
            book.publication = 0;
            return book;
        }
        return book;
    });


    Database.Publication.forEach((publication) => {
        if(publication.id === parseInt(id)){
            const filteredBooks = publication.books.filter((book) => book !== isbn);
            publication.books = filteredBooks;
            return publication;
        }
        return publication;
    });

    return res.json({book: Database.Book, publication: Database.Publication});
})
OurApp.listen(4000 , () => console.log("Server is running"));