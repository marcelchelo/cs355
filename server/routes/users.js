var express = require('express');
var router = express.Router();
var users = require('../controller/usersController')
/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
