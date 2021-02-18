var mongo = require("mongodb");
var mongoose = require("mongoose");
var mongoDB =
  "mongodb+srv://iceman951:Iceman0811@projectcluster.vidjs.gcp.mongodb.net/LearningManDB?retryWrites=true&w=majority";

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Connect
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongodb Connect Error"));

var problemSchema = mongoose.Schema({
  problem_id: {
    type: String,
  },
  lesson_id: {
    type: String
  },
  title: {
    type: String,
  },
  tools: {
    type: String,
  },
  description: {
    type: String,
  },
  solution: {
    type: Array,
  },
});
var Problems = (module.exports = mongoose.model("problems", problemSchema));

module.exports.getProblems = function (callback, limit) {
  Problems.find(callback).limit(limit);
};

module.exports.getProblemID = function (problem_id, callback) {
  var query = {
    problem_id: problem_id,
  };
  Problems.findOne(query, callback);
};

module.exports.saveNewProblem = function (newProblem, callback) {
  newProblem.save(callback);
};

module.exports.addSolution = function (info, callback) {
  solution = info["solution"];
  problem_id = info["problem_id"];
  var query = {
    problem_id: problem_id,
  };
  Problems.findOneAndUpdate(
    query,
    {
      $push: {
        solution: solution,
      },
    },
    {
      safe: true,
      upsert: true,
    },
    callback
  );
};
