const AuthorModel = require('../schema/author');

const Router = require('express').Router();

// Route    - /author
// Des      - to get all author
// Access   - Public
// Method   - GET
// Params   - none
// Body     - none
Router.get("/author",async(req,res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
});

// Route    - /author/:authorID
// Des      - to get specific author
// Access   - Public
// Method   - GET
// Params   - authorID
// Body     - none
Router.get("/author/:authorID",async (req,res) => {
    const getSpecificAuthor = await AuthorModel.find({id: req.params.authorID});
    if(!getSpecificAuthor){
        return res.json({
            error: `No author found for the id of ${req.params.authorID}`,
        });
    }
    return res.json({book: getSpecificBook});
});

// Route    - /author/new
// Des      - to add new author
// Access   - Public
// Method   - POST
// Params   - none
// Body     - none
Router.post("/author/new",async (req,res) => {
    try{
         const{newAuthor} = req.body;
         await AuthorModel.create(newAuthor);
         return res.json({message: "Author added to the database"});
     }catch(error){
         return res.json({error: error.message});
     }
 });

// Route    - /author/update/:id
// Des      - update details of author
// Access   - Public
// Method   - PUT
// Params   - id
// Body     - none
Router.put("/author/update/:id",async(req,res) => {
    const {books} = req.body.books;
    const updateAuthor = await AuthorModel.findOneAndUpdate(
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
    return res.json({authors: updateAuthor});
});

// Route    - /author/delete/id
// Des      - delete a author
// Access   - Public
// Method   - DELETE
// Params   - id
// Body     - none
Router.delete("/author/delete/:id",async(req,res) => {
    const {id}=req.params;
    const updateAuthorDatabase = await AuthorModel.findOneAndDelete(
        { id: parseInt(id)}
    );

    return res.json({authors: updateAuthorDatabase});
});

module.exports = Router;