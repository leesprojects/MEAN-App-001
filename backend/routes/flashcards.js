const express = require("express")
const Flashcard = require('../models/flashcard')

const router = express.Router();

router.post('', (req, res, next) => {
  const flashcard = new Flashcard({
    id: null,
    subject: req.body.subject,
    title: req.body.title,
    content: req.body.content
  });
  flashcard.save().then(resultFlashcard => {
    console.log(resultFlashcard);
    res.status(201).json({
      message: "POST: Flashcard " + resultFlashcard._id + " | Successful",
      flashcardId: resultFlashcard._id,
    })
  })
})

router.get('', (req, res, next) => {
  Flashcard.find()
    .then(documents => {
      res.status(200).json({
        message: 'Flashcards fetched | Success',
        flashcards: documents
      });
    });
});

router.get("/:id", (req, res, next) => {
  Flashcard.findById(req.params.id).then(flashcard =>{
    if(flashcard){
      res.status(200).json({flashcard});
    }else{
      res.status(404).json({message: 'GET: Flashcard ' + flashcard.id + " | Unsuccessful"});
    }
  });
});

router.put("/:id", (req, res, next) => {
  const flashcard = new Flashcard({
    _id: req.body.id,
    subject: req.body.subject,
    title: req.body.title,
    content: req.body.content
  })
  Flashcard.updateOne({_id: req.params.id}, flashcard).then(result =>{
    console.log("PUT Result | " + result);
    res.status(200).json({message: 'PUT: Flashcard | Successful'});
  });
});

router.delete("/:id", (req, res, next) => {
  Flashcard.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({message: "DELETE: Flashcard " + req.params.id + " | Successful"});
  });
});

module.exports = router;
