import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
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
export default {
  register(req, res) {
    return User
      .create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      })
      .then((user) => {
        const myToken = jwt.sign({
          id: user.id
        },
        'DigitalFortress',
        { expiresIn: 24 * 60 * 60 });
        res.send(200, {
          token: myToken,
          userId: user.id,
          username: user.username
        });
      })
      .catch(() => {
        
        // console.log(err.message)
        res.status(404).send({
          error: 'Username or Email already in use'
        });
      });
  },

  listUsers(req, res) {
    return User
      .findAll({ attributes:
        ['id', 'username', 'email', 'createdAt', 'updatedAt'] })
      .then(users => res.status(200).send(users))
      .catch((error) => {
        res.status(400).send(error.message);
      });
  },

  login(req, res) {
    User
      .findAll({
        where:
        { username: req.body.username,
          password: req.body.password }
      })
      .then((user) => {
        if (user[0]) {
          const myToken = jwt.sign({
            id: user.id
          },
          'DigitalFortress',
          { expiresIn: 24 * 60 * 60 });
          res.status(202).send({
            myToken,
            message: `Welcome back ${req.body.username}`
          });
          return;
        }
        res.status(404).send({
          message: 'Username or password not correct'
        });
      })
      .catch((error) => {
        res.status(400).send(error.message);
      });
  },
  logout(req, res) {
    res.status(200).json({
      message: 'LogOut Successful'
    });
  }
};
