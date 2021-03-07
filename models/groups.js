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

var groupSchema=mongoose.Schema({
    group_id:{
      type: String
    },
    title:{
      type: String
    },
    description:{
      type: String
    },
    instructor_id:{
      type: String
    },
    student:[{
        student_id: {type: String},
        student_name: {type: String},
        email: {type: String},
        progression: {type: Array}
    }]
});
var Groups = module.exports = mongoose.model('groups',groupSchema)

module.exports.getGroups=function(callback,limit){
      Groups.find(callback).limit(limit)
}

module.exports.getGroupID=function(group_id,callback){
      var query = {
          group_id: group_id
      }
      Groups.findOne(query,callback);
}

module.exports.saveNewGroup=function(newGroup,callback){
      newGroup.save(callback);
}