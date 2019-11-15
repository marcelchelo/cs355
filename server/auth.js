var passport = require('passport');
var passportLocal = require('passport-local');
var JWTStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
//make sure passport is already initialized
//this sets up all its functionality


const localAuthFunction = (username, password, done) => {
    User.findOne({
        email: username
    },
        (err, user) => {

            if (!user || !user.validPassword(password)) {
                return done(null, false, {
                    message: "Invalid email/password"
                });
            }
            else if (err) {
                return done(e)
            }
            else {
                return done(null, user);
            }
        });
}





module.exports = (() => {

    passport.use(new passportLocal.Strategy(
        { usernameField: "email", passwordField: "password" },
        localAuthFunction
    ));

    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.JWT_SECRET || 'testSecretTest';

    passport.use(new JWTStrategy(
        opts,
        (jwtPayload, done) => {
            if (Date.now() > jwtPayload.expires) {
                return done('jwt expired');
            }
            return done(null, jwtPayload);
        }
    ));
})();

