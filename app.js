var express = require("express");
var app = express();
const morgan = require("morgan");
const mysql = require("mysql");

const cors = require("cors");
app.use(
  cors({
    origin: "*"
  })
);

app.use(morgan("short")); //morgan will output to our console on terminal whenever a get request is being made and from where.

//Things we need to add   Connection pool
//Use router to move the routes and clean up the code

//Database connection credentials
const connection = mysql.createConnection({
  host: "35.185.14.255",
  user: "admin",
  password: "cs3552019",
  database: "TransferPortal"
});

//API for Admin  Users
app.get("/adminUsers", (req, res) => {
  //route where the json will be outputed
  console.log("Fetching all admin users ");

  const queryString = "SELECT * FROM adminUsers ";
  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users: " + err);
      res.sendStatus(500);
      return;
      // throw err
    }

    console.log("I think we fetched users successfully");

    const adminUsers = rows.map(row => {
      return { Username: row.username, ID: row.id };
    });

    res.json(adminUsers);
  });

  // res.end()
});

//API for CUNY colleges

app.get("/colleges", (req, res) => {
  console.log("Fetching colleges ");

  const queryString = "SELECT * FROM INSTITUTION_VW ";
  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users: " + err);
      res.sendStatus(500);
      return;
      // throw err
    }

    console.log("Institutions fetched  successfully");

    const catalog = rows.map(row => {
      return { Code: row.INSTITUTION, NAME: row.DESCR };
    });

    res.json(catalog);
  });

  // res.end()
});

//api for CRSE_CAT
app.get("/CRSE_CAT", (req, res) => {
  console.log("Fetching QC Catalogue ");

  const queryString = "SELECT * FROM CRSE_CAT LIMIT 0,1000";
  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users: " + err);
      res.sendStatus(500);
      return;
      // throw err
    }

    console.log("Course Catalogue fetched  successfully");

    const catalog = rows.map(row => {
      return {
        Code: row.Course_ID,
        Title: row.Long_Title,
        Description: row.Descr,
        Status: row.Status,
        EquivalentCourses: row.Equiv_Crs
      };
    });

    res.json(catalog);
  });

  // res.end()
});

//transfer rules

app.get("/TRNS_RULES", (req, res) => {
  console.log("Fetching QC Catalogue ");

  const queryString = "SELECT * FROM TRNS_RULES LIMIT 0,1000";
  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users: " + err);
      res.sendStatus(500);
      return;
      // throw err
    }

    console.log("Course Catalogue fetched  successfully");

    const catalog = rows.map(row => {
      return { Name: row.Descr };
    });

    res.json(catalog);
  });

  // res.end()
});

//controlls the verious routes we have
const router = express.Router();
//tells express to serve contents of public directory

app.use(express.static("public"));
//Express will now expect ejs file.    No need to write file.ejs anymore
app.set("view engine", "ejs");

//Home Page
app.get("/", function(req, res) {
  res.render("index.ejs");
  console.log("Someone visited the home page");
});

//Student page
app.get("/student", function(req, res) {
  res.render("student");
  console.log("Someone visited the student page");
});

//adminLogin page
app.get("/adminLogin", function(req, res) {
  res.render("adminLogin.ejs");
  console.log("Someone visited the admin page");
});

//This is the catch all, if unavailable address is provided.
app.get("*", function(req, res) {
  res.send("Sorry this directory is not valid, go back to the homepage");
});

app.listen(3000, () => console.log("Server has started!!"));
//Goto http://localhost:3000/  in your browser to see if it works. Make sure you downloaded node.js  and did npm install express --save first
//check the package.json file to see which packages you need to install under dependencies.  You install with npm install <package name>
