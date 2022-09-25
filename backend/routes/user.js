const express = require ("express");
const bcrypt = require("bcryptjs");
const User = require('../models/user');
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", (req, res, next) => { //http://localhost:3000/api/user/register
  bcrypt.hash(req.body.password, 10, ) //has the password on creation so its not visible
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: "User created",
            result: result
          })
          .catch(err => {
            res.status(500).json({
              error: err
            });
          });
        });
    });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;

  User.findOne({email: req.body.email}) //Find a user by email association and then get user object
    .then(user => {
      if(!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password); //Allows us to provide a raw value, hash it and then compare it to an existing hashed value
    })
    .then(result => {
      console.log("Login result | " + result)
      if(!result){ //If there is user match
        return res.status(401).json({
          message: "Atuh failed"
        });
      }
      const token = jwt.sign( //Creates a new token given an input, don't need to return password since they've already logged in
          { email: fetchedUser.email, userId: fetchedUser._id},
          process.env.JWT_KEY,
          { expiresIn: '1h'}
        );
        console.log(token);
        res.status(200).json({
          token: token
        });
    })
    .catch(err => { //If there is an error in the match
      console.log(err);
      return res.status(401).json({
        message: "Auth failed"
      })
    });
});

module.exports = router
