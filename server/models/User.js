//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

//To check if user is Unique
// https://blog.cloudboost.io/node-js-authentication-with-passport-4a125f264cd4
const uniqueValidator = require("mongoose-unique-validator");

const bcrypt = require('bcrypt');

const user = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true
    },
    passwordHash: {
        type: String,
        required: [true, 'Password is required.']
    }
});

user.plugin(uniqueValidator);

user.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.passwordHash);
};

user.virtual("password").set(function(value) {
    this.passwordHash = bcrypt.hashSync(value, 12);
});

user.methods.toJSON = function(){
    var ret = this.toObject();
    delete ret.passwordHash;
    delete ret._id;
    delete ret.__v;

    return ret;
}

module.exports = mongoose.model('User', user);