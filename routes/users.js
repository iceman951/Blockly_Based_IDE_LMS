var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Instructor = require('../models/instructors');
const { check, validationResult } = require("express-validator");

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

router.get('/register', function(req, res, next) {
  res.render('users/register');
});

router.get("/login", function (req, res, next) {
  res.render("users/login");
});

router.get("/logout", function(req, res, next) {
      req.logout();
      res.redirect('/users/login');
});

router.post("/login", passport.authenticate('local', {
failureRedirect: '/users/login',
failureFlash: true
}),
function(req, res) {
var usertype=req.user.type;
res.redirect("/"+usertype+'s/groups');
});

passport.serializeUser(function(user, done) {
done(null, user.id);
});

passport.deserializeUser(function(id, done) {
User.getUserById(id, function(err, user) {
done(err, user);
});
});

passport.use(new LocalStrategy(function(username, password, done) {
User.getUserByUserName(username, function(err, user) {
if (err) throw err;
console.log(user);
if (!user) {
    return done(null, false);
}
User.comparePassword(password, user.password, function(err, isMatch) {
  if (err) return err;
  console.log(isMatch);
  if (isMatch) {
    return done(null, user);
  } else {
    return done(null, false);
  }
});
});
}));


router.post('/register', [
  check('email', 'กรุณาป้อนอีเมล').isEmail(),
  check('password', 'กรุณาป้อนรหัสผ่าน').not().isEmpty(),
  check('instructor_id', 'กรุณาป้อนไอดี').not().isEmpty(),
  check('fname', 'กรุณาป้อนชื่อของท่าน').not().isEmpty(),
  check('lname', 'กรุณาป้อนนามสกุลของท่าน').not().isEmpty(),
  check('username', 'กรุณาป้อน Username').not().isEmpty(),
], function(req, res, next) {
  const result = validationResult(req);
  var errors = result.errors;
  //Validation Data
  if (!result.isEmpty()) {
    //Return error to views
    res.render('users/register', {
        errors: errors
    })
  }else{
      var username=req.body.username;
      var type=req.body.type;
      var fname=req.body.fname;
      var lname=req.body.lname;
      var instructor_id=req.body.instructor_id;
      var email=req.body.email;
      var password=req.body.password;

      var newUser=new User({
          username:username,
          email:email,
          password:password,
          type:type
      });
      if(type=="student"){
          var newStudent=new Student({
                username:username,
                fname:fname,
                lname:lname,
                email:email
          });
          User.saveStudent(newUser,newStudent,function(err,user){
                if(err) throw err
          })
      }else{
        var newInstructor=new Instructor({
              username:username,
              fname:fname,
              lname:lname,
              email:email,
              instructor_id:instructor_id
        });
        User.saveInstructor(newUser,newInstructor,function(err,user){
              if(err) throw err
        })
      }
      res.redirect('/');
  }
});

module.exports = router;