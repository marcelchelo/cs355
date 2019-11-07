var express = require ("express");
var app = express();

//tells express to serve contents of public directory
app.use(express.static("public"))
//Express will now expect ejs file.    No need to write file.ejs anymore
app.set("view engine", "ejs")

//Home Page
app.get('/', function (req, res) {
  res.render("index.ejs")
  console.log("Someone visited the home page")
});

//adminLogin page
app.get('/adminLogin', function (req, res) {
  res.render("adminLogin.ejs")
  console.log("Someone visited the admin page")
});
 


//This is the catch all, if unavailable address is provided. 
app.get('*', function (req, res) {
  res.send("Sorry this directory is not valid, go back to the homepage")
});





app.listen(3000, () => console.log('Server has started!!'));
//Goto http://localhost:3000/  in your browser to see if it works. Make sure you downloaded node.js  and did npm install express --save first 
//check the package.json file to see which packages you need to install under dependencies.  You install with npm install <package name>
