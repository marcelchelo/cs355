var express = require ("express");

var app = express();


//testing requests 
app.get('/hello', function (req, res) {
  res.send('GET request to the homepage')
  console.log("Someone visited the site")
});


app.listen(3000, () => console.log('Server has started!!'));

//Goto http://localhost:3000/hello   in your browser to see if it works.   Make sure you downloaded node.js  and did npm install express --save first 
