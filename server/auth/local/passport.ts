let passport = require('passport');
import { Strategy as LocalStrategy } from 'passport-local';

function localAuthenticate(User, email, password, done) {
  User.findOne({
    email: email.toLowerCase()
  }).exec()
    .then(user => {
      if (!user) {
        return done(null, false, {
          message: 'This email is not registered.'
        });
      } else if (!user.active) {
        return done(null, false, {
          message: 'This user is inactive.'
        });
      }
      user.authenticate(password, function (authError, authenticated) {
        if (authError) {
          return done(authError);
        }
        if (!authenticated) {
          return done(null, false, { message: 'This password is incorrect.' });
        } else {
          return done(null, user);
        }
      });
    })
    .catch(err => done(err));
}

export function setup(User/*, config*/) {
  // passport.serializeUser(function (user, fn) {
  //   fn(null, user.id);
  // });


  // passport.deserializeUser(function (id, fn) {
  //   User.findOne({_id: id}, function (err, user) {
  //     fn(err, user);
  //   });
  // });

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  }, function (email, password, done) {
    return localAuthenticate(User, email, password, done);
  }));
}
