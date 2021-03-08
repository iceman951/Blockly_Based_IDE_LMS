var express = require('express');
var router = express.Router();
var Answer = require('../models/answers');
var Student = require('../models/students');

router.get('/', function(req, res, next) {
    Answer.getAnswers(function(err,answers){
        console.log("documents in collection: " + answers.length)
        res.render('groups/answers',{answers: answers});
    });
});

router.get('/lesson/:group_id/:id', function(req, res, next) {
    var group_id = req.params.group_id;
    Answer.getAnswersByLessonID(group_id, req.params.id, function(err,answers){
        res.render('groups/answers',{answers: answers, group_id});
    });
});

router.get('/problem/:group_id/:id', function(req, res, next) {
    var group_id = req.params.group_id;
    Answer.getAnswersByGroupIDandProblemID(group_id, req.params.id, function(err,answers){
        res.render('groups/answers',{answers: answers, group_id});
    });
});

router.post('/', function(req, res, next) {
    Student.replaceExerciseStatusByStudentIDandProblemID(req.params.student_id, req.params.problem_id, function(err){
        res.redirect('back');
    });
});

router.post('/checked', function(req, res, next) {
    var student_id = req.body.student_id;
    var group_id = req.body.group_id;
    var lesson_id = req.body.lesson_id;
    var problem_id = req.body.problem_id;
    var checked = req.body.isTrue;
    if(checked == "ถูก") checked = true;
    else checked = false
    console.log(student_id, group_id, lesson_id, problem_id, checked);
    // Answer.setCheckedAnswers(student_id, group_id, lesson_id, problem_id, function(err) {
    //     res.redirect('back');
    // });
    Student.giveScore(student_id, problem_id, function(err) {
        res.redirect('back');
    })
});

module.exports = router;