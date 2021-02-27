var express = require('express');
var router = express.Router();
var Answer = require('../models/answers');

router.get('/', function(req, res, next) {
    Answer.getAnswers(function(err,answers){
        res.render('groups/answers',{answers: answers});
    });
});

module.exports = router;