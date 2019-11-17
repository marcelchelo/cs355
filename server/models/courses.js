
//Require Mongoose

const mongoose = require('mongoose');



//Define a schema

const Schema = mongoose.Schema;



const course = new Schema({

Course_ID: {

type: Number,

required: [true, 'Course ID is required.'],

unique: true

},

Descr: {

type: String,

required: [true, 'Course Name is required.']

},

Equiv_Crs: {

type: Number,

},

Consent: {

type: String

},

Min_Units: {

type: Number

},

Max_Units: {

type: Number

},

Allowed_Unt: {

type: Number

},

Allow_Comp: {

type: Number

},

Long_Title: {

type: String

},

Crs_Cntct: {

type: String

},

Designation: {

type: String

},

Crse_Count:{

type: Number

},

Component: {

type: String

}





});





module.exports = mongoose.model('Course', course);