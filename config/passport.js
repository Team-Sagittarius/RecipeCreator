const passport = require('passport');
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User')


// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
    { usernameField: 'username' },
    (username, password, done) => {
        console.log('Inside local strategy callback')
        // here is where you make a call to the database
        // to find the user based on their usernames
        // for now, we'll just pretend we found that it was users[0]
        User.findOne({ username: username })
            .then(user => {
                bcrypt.compare(password, user.passwordHash)
                    .then(match => {
                        if (match) {
                            console.log('Local strategy returned true')
                            return done(null, user)
                        } else {
                            return done(null, false, { message: 'Invalid credentials.\n' })
                        }
                    })
            })
    }
));

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
    console.log('Inside serializeUser callback. User id is save to the session file store here')
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    console.log('id in des user...', id)
    User.findById(id, function (err, user) {
        console.log('user in des user...', user)
        done(err, user);
    });
});

module.exports = passport