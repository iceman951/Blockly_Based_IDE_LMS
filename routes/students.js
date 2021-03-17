var express = require('express');
var router = express.Router();
var Student=require('../models/students');
var Group=require('../models/groups');

router.get('/groups/:id', function(req, res, next) {
    var section_id = req.params.id
    Student.getStudentsByGroupID(section_id,function(err,students){
        res.render('groups/students', {students: students, section_id}); 
    });
});

router.post('/delete', function(req, res, next) {
    var student_id = req.body.student_id;
    Student.deleteStudentByStudentID(student_id,function(err){
        res.redirect('back');
    });
});

module.exports = router;