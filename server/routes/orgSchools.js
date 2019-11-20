var express = require('express');
var router = express.Router();
var orgSchools = require('../controller/orgSchoolsController');


/* GET welcome msg. */
router.get('/', function(req, res) {
  orgSchools.welcome(res);
});

// Find orgSchools by name
router.post('/query', function(req, res, next){
  return orgSchools.getOrgSchoolsByName(req, res);
})

// Find orgSchools by country
router.post('/country', function(req, res, next){
  return orgSchools.getOrgSchoolsByCountry(req, res);
})

// Find orgSchools by country and state
router.post('/countryAndState', function(req, res, next){
  return orgSchools.getOrgSchoolsByCountryAndState(req, res);
})



module.exports = router;