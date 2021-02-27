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
    lesson_id:{
      type: String
    },
    problem_id:{
      type: String
    },
    content:{
      type: String
    }
});
var Answer = module.exports = mongoose.model('answers',answerSchema)

module.exports.getAnswers=function(callback,limit){
      Answer.find(callback).limit(limit)
}