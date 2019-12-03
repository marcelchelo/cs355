var express = require('express')
var app = express()
const path = require('path')
const morgan = require('morgan')
const mysql = require('mysql')

const cors = require('cors')
app.use(
  cors({
    origin: '*',
  })
)

// ? Please add comments and explain what the modules do for the rest of the group to know thanks marcelo a

// ! VIEW ENGINE AND ROUTING VIEWS/ASSETS(CSS/IMG/JS)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use('/assets', express.static('assets'))
app.use('/style', express.static('style'))
app.use('/js', express.static('js'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/student', (req, res) => {
  res.render('student')
})

//app.use(morgan('short'))

//app.use(express.static(path.join(__dirname)))
app.use(morgan('short')) //morgan will output to our console on terminal whenever a get request is being made and from where.

//Things we need to add   Connection pool
//Use router to move the routes and clean up the code

//Database connection credentials
const connection = mysql.createConnection({
  host: '35.185.14.255',
  user: 'admin',
  password: 'cs3552019',
  database: 'TransferPortal',
})

//API for Admin  Users
app.get('/adminUsers', (req, res) => {
  //route where the json will be outputed
  console.log('Fetching all admin users ')

  const queryString = 'SELECT * FROM adminUsers '
  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for users: ' + err)
      res.sendStatus(500)
      return
      // throw err
    }

    console.log('I think we fetched users successfully')

    const adminUsers = rows.map(row => {
      return { Username: row.username, ID: row.id }
    })

    res.json(adminUsers)
  })

  // res.end()
})

//API for CUNY colleges
app.get('/colleges', (req, res) => {
  var importedSchools
  console.log('Fetching colleges ')

  const queryString = 'SELECT * FROM INSTITUTION_VW '
  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for users: ' + err)
      res.sendStatus(500)
      return
      // throw err
    }

    console.log('Institutions fetched successfully')

    const catalog = rows.map(row => {
      return { Code: row.INSTITUTION, NAME: row.DESCR }
    })

    res.json(catalog)
  })
  // res.end()
})

app.post('/colleges', (req, res) => {
  console.log('fetching')

  const connection = mysql.createConnection({
    host: '35.185.14.255',
    user: 'admin',
    password: 'cs3552019',
    database: 'TransferPortal',
  })

  const queryString = 'SELECT * FROM INSTITUTION_VW '
  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for users: ' + err)
      res.sendStatus(500)
      return
      // throw err
    }

    console.log('Institutions fetched successfully')

    const catalog = rows.map(row => {
      return { Code: row.INSTITUTION, NAME: row.DESCR }
    })

    res.json(catalog)
  })
})

//api for CRSE_CAT
app.get('/CRSE_CAT', (req, res) => {
  console.log('Fetching QC Catalogue ')

  const queryString = 'SELECT * FROM CRSE_CAT LIMIT 0,1000'
  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for users: ' + err)
      res.sendStatus(500)
      return
      // throw err
    }

    console.log('Course Catalogue fetched  successfully')

    const catalog = rows.map(row => {
      return {
        Code: row.Course_ID,
        Title: row.Long_Title,
        Description: row.Descr,
        Status: row.Status,
        EquivalentCourses: row.Equiv_Crs,
      }
    })

    res.json(catalog)
  })

  // res.end()
})

//api for Credit_Based_OnTEst

app.get('/creditBasedOnTest', (req, res) => {
  console.log('Fething AP exams to course equivalency')

  const queryString = 'select * from  Credit_Based_OnTest'
  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log('Failed to query Credits based on AP exams')
      res.sendStatus(500)
      return
    }
    console.log('Credits based on Exams taken fethced successfully')

    const creditBasedOnTests = rows.map(row => {
      return {
        Institution: row.Institution,
        TestID: row.testID,
        Component: row.Component,
      }
    })
    res.json(creditBasedOnTests)
  })
})

// ! TEST //

// ? this endpoint includes College name, min/max score for test to meet requirements of said college,
// ? test name, LISTAGG_C_CRSE_ID_WITHI(I think this denotes courseID equivalence)
// ? 3 tablets utilized: INSTITUTION_VW AND TEST_EQ BY THEIR INSTITUTION CODE
// ? TEST_EQ AND TEST_TABLE BY THEIR TEST COMPONENT ID

app.get('/TEST_FETCH/:id', (req, res) => {
  const userId = req.params.id
  const queryString =
    'SELECT * FROM (SELECT INSTITUTION, DESCR FROM INSTITUTION_VW WHERE DESCR = ?) col INNER JOIN(SELECT Institution, Component, Test_ID, LISTAGG_C_CRSE_ID_WITHI, Min_Score, Max_Score FROM TEST_EQ ) test_eq ON col.INSTITUTION = test_eq.Institution INNER JOIN (SELECT testID, Component, Descr, TestComponentDescr, Min_Score, Max_Score FROM test_Table) test_table ON test_eq.Component = test_table.Component'
  connection.query(queryString, [userId], (err, rows, fields) => {
    if (err) {
      console.log('Failed to query : ' + err)
      res.sendStatus(500)
      res.end()
      return
    } else {
      res.json(rows)
    }
  })
})

// USE TransferPortal
// SELECT * FROM
// (SELECT INSTITUTION, DESCR FROM INSTITUTION_VW WHERE DESCR = "Baruch College") col
// INNER JOIN
// (SELECT Institution, Component, Test_ID, LISTAGG_C_CRSE_ID_WITHI, Min_Score, Max_Score FROM TEST_EQ ) test_eq
// ON col.INSTITUTION = test_eq.Institution
// INNER JOIN
// (SELECT testID, Component, Descr, TestComponentDescr, Min_Score, Max_Score FROM test_Table) test_table
// ON test_eq.Component = test_table.Component




//transfer rules
app.get('/TRNS_RULES', (req, res) => {
  console.log('Fetching QC TransferRules ')

  const queryString = 'SELECT * FROM TRNS_RULES LIMIT 0,1000'
  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for TransferRules: ' + err)
      res.sendStatus(500)
      return
    }

    console.log('Transfer Rules fetched  successfully')

    // const tRules = rows.map(row => {
    //   return { Name: row.Descr

    //   }
    // })

    res.json(rows)
  })

  // res.end()
})


app.get('/TRNS_RULES/:id', (req, res) => {
  const userId = req.params.id
  const queryString =
    'SELECT * FROM (SELECT Course_ID, Descr w, Equiv_Crs FROM CRSE_CAT LIMIT 15000) A INNER JOIN (SELECT Descr, CRSE_ID FROM TRNS_RULES WHERE Descr = ?) B ON A.Course_ID = B.CRSE_ID'
  connection.query(queryString, [userId], (err, rows, fields) => {
    if (err) {
      console.log("failed to query for courses: " + err)
      res.sendStatus(500)
      res.end()
      return
    } else {
      const mapping = rows.map(row => {
        return {
          CollegeName: row.Descr,
          CourseName: row.w,
          CourseID: row.Course_ID,
          EquivalentCrs: row.Equiv_Crs
        }
      })
      res.json(mapping)
    }

  })


})


// USE TransferPortal;
// SELECT * FROM
//   (SELECT Course_ID, Descr, Equiv_Crs FROM CRSE_CAT LIMIT 15000) A
// INNER JOIN
//   (SELECT Descr, CRSE_ID FROM TRNS_RULES WHERE Descr = "Baruch College") B
// ON A.Course_ID = B.CRSE_ID


//controlls the verious routes we have
const router = express.Router()
//tells express to serve contents of public directory

app.use(express.static('public'))
//Express will now expect ejs file.    No need to write file.ejs anymore
// app.set('view engine', 'ejs')

//Home Page
// app.get('/', (req, res) => {
// 	res.render('index')
// })

//Student page
// app.get('/student', function(req, res) {
// 	res.render('student.ejs')
// 	console.log('Someone visited the student page')
// })

//adminLogin page
// app.get('/adminLogin', function(req, res) {
// 	res.render('adminLogin.ejs')
// 	console.log('Someone visited the admin page')
// })

//This is the catch all, if unavailable address is provided.
app.get('*', function (req, res) {
  res.send('Sorry this directory is not valid, go back to the homepage')
})

const PORT = process.env.PORT || 3000

app.listen(3000, () =>
  console.log('Server has started on local Host port 3000!!')
)
//Goto http://localhost:3000/  in your browser to see if it works. Make sure you downloaded node.js  and did npm install express --save first
//check the package.json file to see which packages you need to install under dependencies.  You install with npm install <package name>
