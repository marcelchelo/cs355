var express = require ("express");
var app = express();

//Test Route
app.get('/', function (req, res) {
  res.render("index.ejs")
  console.log("Someone visited the home page")
});

app.get('/student', function (req, res) {
  res.render("student.ejs")
  console.log("Someone visited the student page")
});



//This is the catch all 
app.get('*', function (req, res) {
  res.send("Sorry this directory is not valid, go back to the homepage")
});





app.listen(3000, () => console.log('Server has started!!'));
//Goto http://localhost:3000/  in your browser to see if it works. Make sure you downloaded node.js  and did npm install express --save first 
//check the package.json file to see which packages you need to install under dependencies.  You install with npm install <package name>
