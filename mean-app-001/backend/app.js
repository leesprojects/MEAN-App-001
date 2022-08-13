//REST App
const express = require('express');
const bodyParser = require('body-parser');

const app = express(); //function call returns a New express app
console.log("backend/app.js called");

app.use(bodyParser.json()); //Return a middleware for parsing JSON data
app.use(bodyParser.urlencoded( {extended: false} ));

app.use((req, res, next) => {
  console.log("backend/app.js | Set: Headers");
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
    next();
});

app.post("/api/posts", (req, res, next) => { //Route: Get newly created post
  const post = req.body;
  console.log(post);
  res.status(201).json({ //Don't use next() because this is a response
    message: 'Post created successfully',
  }); //201 means OK and new resource added
})

app.get('/api/posts', (req, res, next) => { //Route: Get stored posts
  console.log("backend/app.js | Called: Get Posts");
  const posts = [
    { id: 'id123',
    title: 'First server-side post',
    content: 'Message from the server'},
    { id: 'id1234',
    title: 'Second server-side post',
    content: 'Another message from the server'}
  ]

  res.status(200).json({ //200 means OK
    message: 'Posts fetched successfully',
    posts: posts
  });
  res.status(404).json({ //404 means Not OK: Missing
    message: 'Posts fetched unsuccessfully',
  });
});

module.exports = app; // Export the express app with all middlewares
