//REST App
const express = require('express');

const app = express(); //function call returns a New express app
console.log("backend/app.js called");

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

app.use('/api/posts', (req, res, next) => { //targeting only posts
  console.log("backend/app.js | Called: Get Posts");
  const posts = [
    { id: 'id123',
    title: 'First server-side post',
    content: 'Message from the server'},
    { id: 'id1234',
    title: 'Second server-side post',
    content: 'Another message from the server'}
  ]

  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  });
  res.status(404).json({
    message: 'Posts fetched unsuccessfully',
  });
});

module.exports = app; // Export the express app with all middlewares
