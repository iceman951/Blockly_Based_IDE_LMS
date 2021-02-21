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
    Student_Progress: {
        type: Array
    }
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
        group_id: group_id
    }
    Student.find({query}, callback);
}

// module.exports.register = function(info, callback) {
//     student_user=info["student_user"];
//     class_id=info["class_id"];
//     class_title=info["class_title"];
//     var query = {
//         email: student_user
//     }
//     Student.findOneAndUpdate(
//         query,{
//             $push:{
//               "classes":{
//                 class_id:class_id,
//                 class_title : class_title
//               }
//             }
//         },{
//         safe:true,
//         upsert:true
//     },callback)
// }