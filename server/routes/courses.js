var express = require('express');
var router = express.Router();
var courses = require('../controller/coursesController');


/* GET welcome msg. */
router.get('/', function(req, res) {
  courses.welcome(res);
});

/* GET courses by ID. */
router.get('/:Course_ID', function(req, res) {
  courses.getCourses(res, req.params.Course_ID);
});

// Find courses by name
router.post('/query', function(req, res, next){
  console.log(req.body);
  courses.getCoursesByName(req, res)
})



module.exports = router;