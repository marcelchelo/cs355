const major = require('../models/major');

//setup connection to database here
const mongoose = require('mongoose');
// connect to DB
const db = mongoose.connection;
// Display welcome.
exports.welcome = function(res) {
    res.send({'msg': "Welcome to majors catalog"});
};


// Return major based on school name query
exports.getMajorByName = function(req, res){
    let query = new RegExp(req.body.query);
    db.collection("majors").find({"TRNSCR_DESCR": query }).toArray(function(err, results) {
        if (err) {
            res.send({message: "failure"});
        } else {
            res.send( results );
        }
      });
}

// Return major based on school name query
exports.getMajorBySchoolName = function(req, res){
    let query = new RegExp(req.body.query);
    db.collection("majors").find({"INSTITUTUION_DESCR": query }).toArray(function(err, results) {
        if (err) {
            res.send({message: "failure"});
        } else {
            res.send( results );
        }
      });
}



