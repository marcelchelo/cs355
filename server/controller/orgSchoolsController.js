const orgSchools = require('../models/orgSchool');

//setup connection to database here
const mongoose = require('mongoose');
// connect to DB
const db = mongoose.connection;
// Display welcome.
exports.welcome = function(res) {
    res.send({'msg': "Welcome to schools catalog"});
};

// Return schools based on name query
exports.getOrgSchoolsByName = function(req, res){
    let query = new RegExp(req.body.query);
    db.collection("orgSchools").find({"Descr": query }).limit(10).toArray(function(err, results) {
        if (err) {
            res.send({message: "failure"});
        } else {
            res.send( results );
        }
      });
}

// Return schools based on country
exports.getOrgSchoolsByCountry = function(req, res){
    let query = new RegExp(req.body.country);
    db.collection("orgSchools").find({"Country": query }).limit(10).toArray(function(err, results) {
        if (err) {
            res.send({message: "failure"});
        } else {
            res.send( results );
        }
      });
}

// Return schools based on country and state
exports.getOrgSchoolsByCountryAndState = function(req, res){
    let country = new RegExp(req.body.country);
    let state = new RegExp(req.body.state);
    console.log(req.body.state);
    db.collection("orgSchools").find({
        "Country": country, 
        "fullState": state
    })
    .limit(20).toArray(function(err, results) {
        if (err) {
            res.send({message: "failure"});
        } else {
            res.send( results );
        }
      });
}

