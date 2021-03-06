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

var answerSchema=mongoose.Schema({
    student_id:{
      type: String
    },
    group_id:{
      type: String
    },
    lesson_id:{
      type: String
    },
    problem_id:{
      type: String
    },
    content:{
      type: String
    },
    checked: {
      type: Boolean
    }
});
var Answer = module.exports = mongoose.model('answers',answerSchema)

module.exports.getAnswers=function(callback,limit){
  Answer.find(callback).limit(limit)
}

module.exports.getAnswersByLessonID = function(group_id, lesson_id, callback) {
  var query = {
    group_id: group_id,
    lesson_id : lesson_id,
    checked: false
  }
  Answer.find(query, callback);
}

module.exports.getAnswersByGroupIDandProblemID = function(group_id, problem_id, callback) {
  var query = {
    group_id: group_id,
    problem_id : problem_id,
    checked: false
  }
  Answer.find(query, callback);
}

module.exports.setCheckedAnswers = function(student_id, group_id, lesson_id, problem_id, callback) {
  var query = {
    student_id: student_id,
    group_id: group_id,
    lesson_id: lesson_id,
    problem_id: problem_id
  }
  Answer.updateOne(query, {checked: true}, callback);
}