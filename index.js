require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');


//API
const Book = require("./API/book");
const Author = require("./API/author");
const Publication = require("./API/publication");

mongoose.connect(process.env.MONGO_URI  ,
  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
  }
).then(() => console.log('connection estabilished'))
 .catch((err) => console.log("error"));

//initialization
const OurApp = express(); //OurApp contains express

OurApp.use(express.json());

//Microservices
OurApp.use("/book",Book);
OurApp.use("/author",Author);
OurApp.use("/publication",Publication);

//.get is http method "/" is route
OurApp.get("/",(request,response)=>{
    response.json({message: "Server is working!!"}); 

});


OurApp.listen(4000 , () => console.log("Server is running"));