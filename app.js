var express = require ("express");
var app = express();

//Test Route
app.get('/index', function (req, res) {
  res.render("index.ejs")
  console.log("Someone visited the home page")
});

//This is the catch all 
app.get('*', function (req, res) {
  res.send("Sorry this directory is not valid, go back to the homepage")
});





app.listen(3000, () => console.log('Server has started!!'));
//Goto http://localhost:3000/hello   in your browser to see if it works.   Make sure you downloaded node.js  and did npm install express --save first 
