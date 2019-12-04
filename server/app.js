var express = require('express')
var app = express()
const path = require('path')
const morgan = require('morgan')
const mysql = require('mysql')

const cors = require('cors')
app.use(
	cors({
		origin: '*'
	})
)

// setting up routers
//controlls the verious routes we have
const router = express.Router()
var usersRouter = require('./routes/users');
var coursesRouter = require('./routes/courses');
var orgSchoolsRouter = require('./routes/orgSchools');
var majorsRouter = require('./routes/majors');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', (req, res) => {
	res.send({"welcome": "welcome to cs355"});
})

//app.use(express.static(path.join(__dirname)))
app.use(morgan('short')) 
//morgan will output to our console on terminal whenever a get request is being made and from where.


//Database connection credentials
const connection = mysql.createConnection({
	host: '35.185.14.255',
	user: 'admin',
	password: 'cs3552019',
	database: 'TransferPortal'
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());

//port set to 3001
const PORT = process.env.PORT || 3001

//router direction setup
app.use('/users', usersRouter);
app.use('/courses', coursesRouter);
app.use('/orgSchools', orgSchoolsRouter);
app.use('/majors', majorsRouter);

app.listen(3001, () => console.log('Server has started on local Host port 3001!!'))


module.exports = app;