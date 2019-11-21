// Descr	City	State	fullState	Country

//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

//To check if orgSchools is Unique
// https://blog.cloudboost.io/node-js-authentication-with-passport-4a125f264cd4
const uniqueValidator = require("mongoose-unique-validator");

const bcrypt = require('bcrypt');

const orgSchools = new Schema({
    Descr: {
        type: String,
        required: [true, 'Name is required.']
    },
    City: {
        type: String,
        required: [true, 'City is required.'],
    },
    State: {
        type: String,
    },
    fullState: {
        type: String,
    },
    Country: {
        type: String,
    }
});

orgSchools.plugin(uniqueValidator);


module.exports = mongoose.model('orgSchools', orgSchools);