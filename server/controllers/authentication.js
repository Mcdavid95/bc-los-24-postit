import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
// import sequelize from 'sequelize';
import model from '../models/';

const User = model.User;

/**
 * This class handles the logic for registering an account signin and signing out
 */
// export default class AuthCtrl {
// /**
//  * This method handles logic for registering a user
//  * @param {*} req
//  * @param {*} res
//  * @returns {void}
//  */
module.exports = {
  register(req, res) {
    return User
      .create({
        username: req.body.username,
        mySalt: 10,
        password: bcrypt.hashSync(req.body.password, mySalt),
        email: req.body.email
      })
      .then((user) => {
        const myToken = jwt.sign({
          id: user.id
        },
        'secret',
        {
          expiresIn: 24 * 60 * 60
        });
        res.send(200, {
          token: myToken,
          userId: user.id,
          username: user.username
        });
      })
      .catch(() => {
        User.destroy({
          where: { username: req.body.username }
        });
        // console.log(err.message)
        res.status(404).json({
          error: 'Username or password already in use'
        });
      });
  }
};

// /**
//  *  This method handles logging in an existing user
//  * @param {object} req
//  * @param {object} res
//  * @param {object} next
//  * @returns {void}
//  */
module.exports = {
  login(req, res, next) {
    return User
      .findOne({
        where:
        {username: req.body.username}
      })
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return res.status(401).json({
        error: info
      });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({
          message: 'Cannot log in user'
        });
      }
      res.status(200).json({
        message: `Welcome back ${req.session.passport.user}`,
        user: req.session.passport.user
      });
    });
  })(req, res, next);
}

/**
 * This method handles the logic for logging a user out
 * @param {object} req
 * @param {object} res
 * @returns {void}
 */
module.exports.logout = (req, res) => {
  req.logout();
  res.status(200).json({
    message: 'Logged out successfully'
  });
}

