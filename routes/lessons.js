var express = require('express');
var router = express.Router();
var Lesson=require('../models/lessons');

router.get('/', function(req, res, next) {
    Lesson.getLessons(function(err,lessons){
        console.log(lessons);
        res.render('lessons',{lessons:lessons});
    });
});

module.exports = router;