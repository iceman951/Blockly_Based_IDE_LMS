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

var instructorSchema = mongoose.Schema({
  instructor_id: {
    type: String
  },
  username: {
    type: String
  },
  fname: {
    type: String
  },
  lname: {
    type: String
  },
  email: {
    type: String
  },

});

var Instructor = module.exports = mongoose.model('instructors', instructorSchema)

module.exports.getInstructorsByUserName = function(username, callback) {
  var query = {
    username: username
  }
  Instructor.findOne(query, callback);
}

module.exports.getInstructorsByInstructorID = function(instructor_id, callback) {
    var query = {
      instructor_id: instructor_id
    }
    Instructor.findOne(query, callback);
  }

module.exports.register = function(info, callback) {
      instructor_user=info["instructor_user"];
      class_id=info["class_id"];
      class_title=info["class_title"];
      var query = {
          username: instructor_user
      }
      Instructor.findOneAndUpdate(
        query,{
          $push:{
            "classes":{
              class_id:class_id,
              class_title : class_title
            }
          }
        },{
          safe:true,
          upsert:true
        },callback)
}
