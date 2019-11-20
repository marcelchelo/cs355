var express = require('express');
var router = express.Router();
var majors = require('../controller/majorsController');


/* GET welcome msg. */
router.get('/', function(req, res) {
  majors.welcome(res);
});

// Find majors by school name
router.post('/query', function(req, res, next){
    return majors.getMajorByName(req, res);
  })

// Find majors by school name
router.post('/bySchool', function(req, res, next){
  return majors.getMajorBySchoolName(req, res);
})

module.exports = router;