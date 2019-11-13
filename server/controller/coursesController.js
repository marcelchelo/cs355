const Course = require('../models/course');

//setup connection to database here
const mongoose = require('mongoose');
// connect to DB
const mongoDB = 'mongodb://localhost:27017/cs355';
mongoose.connect(mongoDB, { useNewUrlParser: true ,useUnifiedTopology: true});
const db = mongoose.connection;
// Display welcome.
exports.welcome = function(res) {
    res.send({'msg': "Welcome to course catalog"});
};

// Return course by ID.
exports.getCourses = function(res, courseID) {
    let course = db.collection("courses").findOne({"Course_ID": parseInt(courseID, 10)});
    course.then(function(course){ 
        delete course["_id"];
        res.send(course);
    });
    
};

// Return courses based on query
exports.getCoursesByName = function(req, res){
    let courses = db.collection("courses").find({"Descr": {$regex: "query"}})
    .toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
      });
}

