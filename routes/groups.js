var express = require('express');
var router = express.Router();
var Groups=require('../models/groups');
var Instructor=require('../models/instructors');

router.post('/register',function(req,res,next){
    var group_id = req.body.group_id;
    var title = req.body.title;
    var description = req.body.description;
    var instructor_id = req.body.instructor_id;
    var newGroup = new Groups({
       group_id:group_id,
       title:title,
       description:description,
       instructor_id:instructor_id
    })
    info = [];
    info["instructor_user"] = req.user.username;
    info["group_id"] = group_id;
    info["group_title"] = title;

    Groups.saveNewGroup(newGroup,function(err,student){
           if(err) throw err;
    });

    Instructor.register(info,function(err,instructor){
           if(err) throw err;
    });

    res.location('/instructors/groups');
    res.redirect('/instructors/groups');
});

router.get('/',function(req,res,next) {
       Group.getGroups(function(err,groups){
              res.status(200).send()
       })
})
module.exports = router;