var express = require('express');
var router = express.Router();
var Groups=require('../models/groups');

/* GET home page. */
router.get('/', function(req, res, next) {
  Groups.getGroups(function(err,groups){
    res.render('index', { groups: groups });
  })
});

module.exports = router;