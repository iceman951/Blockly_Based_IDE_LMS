var express = require("express");
var router = express.Router();
var Problems = require("../models/problems");

router.get("/:id/viewsolution", function (req, res, next) {
  Problems.getProblemID([req.params.id], function (err, problems) {
    res.render("problems/viewsolution", { problems: problems});
  });
});

router.get("/:id/solution/:solution_index", function (req, res, next) {
  Problems.getProblemID([req.params.id], function (err, problems) {
    var solution = problems.solution[req.params.solution_index]; 
    res.render("problems/solution", { problems: problems, solution: solution});
  });
});

// GET problem by problem_id
router.get("/:id", (req, res) => {
  Problems.getProblemID([req.params.id], function (err, problems) {
    res.status(200).send(problems);
  });
});

module.exports = router;