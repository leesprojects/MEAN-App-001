//REST App
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require("./routes/posts");

const app = express(); //function call returns a New express app
console.log("backend/app.js called");

mongoose
  .connect("mongodb+srv://Lee:m32RrmtcOk0M0Lvb@mean-app-001-db.uyxp3be.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connection to MonogDB | Successful");
 })
   .catch(() => {
    console.log("Connection to MonogDB | Failed");
 })

app.use(bodyParser.json()); //Return a middleware for parsing JSON data
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  //console.log("backend/app.js | Set: Headers");
  res.setHeader(
    'Access-Control-Allow-Origin',
     '*' //Allow all domains to access
     );
  res.setHeader(
    'Access-Control-Allow-Headers', //Restrict to domains with a certain set of headers
    "Origin, X-Requested-With, Content-Type, Accept"
    );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    //console.log("backend/app.js | Set: Headers | Complete");
    next();
});

app.use("/api/posts", postsRoutes); //Only requests with api/posts will be sent here

module.exports = app; // Export the express app with all middlewares
