var express = require('express');
var router = express.Router();
var Student=require('../models/students');
var Groups=require('../models/groups');

router.get('/groups/:id', function(req, res, next) {
    Student.getStudentsByGroupID(req.params.id,function(err,students){
        console.log("route students:",students);
        res.render('groups/students',{students: students});
    });
});

module.exports = router;