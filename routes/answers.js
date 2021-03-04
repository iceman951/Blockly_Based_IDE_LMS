var express = require('express');
var router = express.Router();
var Answer = require('../models/answers');

router.get('/', function(req, res, next) {
    Answer.getAnswers(function(err,answers){
        console.log("documents in collection: " + answers.length)
        res.render('groups/answers',{answers: answers});

    });
});

router.get('/lessonOne', function(req, res, next) {
    Answer.getAnswersByLessonID(1,function(err,answers){
        res.render('groups/answers',{answers: answers});

    });
});

router.get('/lessonTwo', function(req, res, next) {
    Answer.getAnswersByLessonID(2,function(err,answers){
        res.render('groups/answers',{answers: answers});

    });
});

router.get('/lessonThree', function(req, res, next) {
    Answer.getAnswersByLessonID(3,function(err,answers){
        res.render('groups/answers',{answers: answers});

    });
});

router.get('/problem/:id', function(req, res, next) {
    Answer.getAnswersByProblemID(req.params.id,function(err,answers){
        res.render('groups/answers',{answers: answers});
    });
});

module.exports = router;