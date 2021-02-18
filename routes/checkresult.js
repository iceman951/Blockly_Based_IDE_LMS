var express = require("express");
var router = express.Router();

const axios = require('axios');

//diff xml
var tool = require("diff-js-xml");
const schema = null;
const options = { compareElementValues: false };

//check size of object
Object.size = function (obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

router.post("/", (req, res, next) => {
  let countCorrect = 0;
  async function checkAnswer() {
    let resProblem = await axios.get("http://localhost:5000/problems/" + req.body.problem_id);
    let resAnswer = req.body.content;

    let size = Object.size(resProblem.data.solution);

    console.log("resProblem:" + typeof resProblem.data.solution);
    console.log("size:" + size);
    let lhsXML = resAnswer;
    let rhsXML = {};
    for (let i = 0; i < size; i++) {
      rhsXML = resProblem.data.solution[i];
      tool.diffAsXml(lhsXML, rhsXML, schema, options, (result) => {
        if (Object.keys(result).length === 0) countCorrect++;
      });
    }
    if (countCorrect > 0) res.status(200).json({ data: true });
    else res.status(200).json({ data: false });
    console.log("countCorrect: "+ countCorrect);
  }
  checkAnswer();
});

module.exports = router;