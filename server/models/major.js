// INSTITUTION	INSTITUTUION_DESCR	ACAD_PLAN	DEGREE	DEGREE_DESCR	TRNSCR_DESCR

//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

//To check if major is Unique
// https://blog.cloudboost.io/node-js-authentication-with-passport-4a125f264cd4
const uniqueValidator = require("mongoose-unique-validator");

const bcrypt = require('bcrypt');

const majors = new Schema({
    INSTITUTION: {
        type: String,
        required: [true, 'INSTITUTION_NAME is required.']
    },
    INSTITUTUION_DESCR: {
        type: String,
        required: [true, 'INSTITUTUION_DESCR is required.'],
    },
    ACAD_PLAN: {
        type: String,
    },
    DEGREE: {
        type: String,
    },
    DEGREE_DESCR: {
        type: String,
    },
    TRNSCR_DESCR: {
        type: String,
    }
});

majors.plugin(uniqueValidator);


module.exports = mongoose.model('majors', majors);