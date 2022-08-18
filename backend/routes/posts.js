const express = require("express")
const Post = require('../models/post')

const router = express.Router();

//Serve-side routing, de-coupled from client-side
router.post('', (req, res, next) => { //Route: Get newly created post
  console.log("router.post called")
  //console.log("backend/router.js | router.post ('/api/posts') | Called");
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
  //console.log("backend/router.js | router.post ('/api/posts') | Complete");
})

router.put("/:id", (req, res, next) => {
  console.log("router.put called")
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({_id: req.params.id}, post).then(result =>{
    console.log(result);
    res.status(200).json({message: 'Update successful'});
  });
});

router.get('', (req, res, next) => { //Route: Get stored posts
  console.log("router.get '' called")
  //console.log("backend/router.js | router.get ('/api/posts') | Called");
  Post.find().then(documents => { //If documents recieved then
      res.status(200).json({ //200 means OK
        message: 'Posts fetched | Success',
        posts: documents
      });
    });
  //console.log("backend/router.js | router.get ('/api/posts') | Finished");
});

router.get("/:id", (req, res, next) => {
  console.log("router.get ':id' called")
  Post.findById(req.params.id).then(post =>{
    if(post){
      res.status(200).json({post});
    }else{
      res.status(404).json({message: 'Post not found!'});
    }
  });
});

//.then() only run if success

router.delete("/:id", (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({message: "Post deleted!"});
  });
}); //Delete by ID

module.exports = router;
