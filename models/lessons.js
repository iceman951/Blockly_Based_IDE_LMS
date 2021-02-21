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

var lessonSchema = mongoose.Schema({
    lessonID: {
      type: String
    },
    name: {
      type: String
    },
    description: {
      type: String
    },
    learning: {
      type: Array
    },
});

var Lessons = (module.exports = mongoose.model("lessons", lessonSchema));

module.exports.getLessons = function (callback, limit) {
  Lessons.find(callback).limit(limit);
};