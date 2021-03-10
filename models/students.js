var mongo = require('mongodb');
var mongoose = require('mongoose');
var mongoDB = "mongodb+srv://iceman951:Iceman0811@projectcluster.vidjs.gcp.mongodb.net/LearningManDB?retryWrites=true&w=majority";

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

//Connect
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connect Error'));

var studentSchema = mongoose.Schema({
    Student_ID: {
      type: String
    },
    Student_Name: {
      type: String
    },
    Student_Email: {
      type: String
    },
    Student_Section: {
        type: String
    },
    Student_Progress: [{
      learning: { type: Array},
      exercise: { type: Object}
    }],
    Student_Score: [
      { type: Object}
    ]
});
var Student = module.exports = mongoose.model('students', studentSchema)
  
module.exports.getStudentsByEmail = function(Student_Email, callback) {
    var query = {
      Student_Email: Student_Email
    }
    Student.findOne(query, callback);
}

module.exports.getStudentsByGroupID = function(group_id, callback) {
    var query = {
        Student_Section : group_id
    }
    Student.find(query, callback);
}

module.exports.deleteStudentByStudentID = function(student_id, callback) {
  var query = {
    Student_ID: student_id
  }
  Student.deleteOne(query, callback);
  console.log("deleted student_id:" + student_id);
}

module.exports.giveScore = function(student_id, problem_id, callback) {
  var query = {
    Student_ID: student_id,
  }
  Student.updateOne(query, {$set:{[`Student_Score.${problem_id}`]: true }}, callback);
} 
