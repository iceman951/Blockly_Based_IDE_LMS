var express = require('express');
var router = express.Router();
var Student=require('../models/students');
var Group=require('../models/groups');

router.get('/groups/:id', function(req, res, next) {
    Student.getStudentsByGroupID(req.params.id,function(err,students){
        res.render('groups/students',{students: students});
    });
});

router.post('/delete', function(req, res, next) {
    var student_id = req.body.student_id;
    Student.deleteStudentByStudentID(student_id,function(err){
        res.redirect('back');
    });

});

// router.post("/", (req, res, next) => {
//     let countCorrect = 0;
//     async function checkAnswer() {
//       let resProblem = await axios.get("https://enigmatic-island-26001.herokuapp.com/problems/" + problem_id);
//       let resAnswer = req.body.content;
  
//       let size = Object.size(resProblem.data.solution);
  
//       console.log("resProblem:" + typeof resProblem.data.solution);
//       console.log("size:" + size);
//       let lhsXML = resAnswer;
//       let rhsXML = {};
//       for (let i = 0; i < size; i++) {
//         rhsXML = resProblem.data.solution[i];
//         tool.diffAsXml(lhsXML, rhsXML, schema, options, (result) => {
//           if (Object.keys(result).length === 0) countCorrect++;
//         });
//       }
//       if (countCorrect > 0) res.status(200).json({ data: true });
//       else res.status(200).json({ data: false });
//       console.log("countCorrect: "+ countCorrect);
//     }
//     checkAnswer();
//   });
  

module.exports = router;