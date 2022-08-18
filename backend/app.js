//REST App
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post')

const app = express(); //function call returns a New express app
console.log("backend/app.js called");

mongoose.connect("mongodb+srv://Lee:m32RrmtcOk0M0Lvb@mean-app-001-db.uyxp3be.mongodb.net/node-angular?retryWrites=true&w=majority")
 .then(() => {
  console.log("Connected to MonogDB successful");
 })
 .catch(() => {
  console.log("Connected to MonogDB failed");
 })

app.use(bodyParser.json()); //Return a middleware for parsing JSON data

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
    "GET, POST, PATCH, DELETE, OPTIONS"
    );
    //console.log("backend/app.js | Set: Headers | Complete");
    next();
});

//Serve-side routing, de-coupled from client-side
app.post('/api/posts', (req, res, next) => { //Route: Get newly created post
  //console.log("backend/app.js | app.post ('/api/posts') | Called");
  const post = new Post({
    id: null,
    title: req.body.title,
    content: req.body.content
  });

  post.save().then(resultPost => { //Mongoose allows us to use save(); which creates a DB query and enter it
    console.log(resultPost);
    res.status(201).json({ //Don't use next() because this is a response
      message: 'Post created successfully',
      postId: resultPost._id,
    }); //201 means OK and new resource added
  });
  //console.log("backend/app.js | app.post ('/api/posts') | Complete");
})

app.get('/api/posts', (req, res, next) => { //Route: Get stored posts
  //console.log("backend/app.js | app.get ('/api/posts') | Called");
  Post.find().then(documents => { //If documents recieved then
      res.status(200).json({ //200 means OK
        message: 'Posts fetched | Success',
        posts: documents
      });
    });
  //console.log("backend/app.js | app.get ('/api/posts') | Finished");
});

//.then() only run if success

app.delete("/api/posts/:id", (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({message: "Post deleted!"});
  });
}); //Delete by ID

module.exports = app; // Export the express app with all middlewares
