import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
// import sequelize from 'sequelize';
import model from '../models/';

dotenv.config();
const User = model.User;

const saltRounds = 10;

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
    User
      .findOne({
        where: {
          username: req.body.username
        },
      })
      .then((user) => {
        if (user) {
          res.status(409).send({ message: 'Username already in use' });
        } else {
          User
            .findOne({
              where: {
                email: req.body.email
              },
            })
            .then((emailExists) => {
              if (emailExists) {
                res.status(409).send({ message: 'Email Already in use' });
              }
              bcrypt.hash(req.body.password, saltRounds)
                .then((hash) => {
                  User
                    .create({
                      username: req.body.username.toLowerCase(),
                      password: hash,
                      email: req.body.email.toLowerCase()
                    })
                    .then(() => {
                      res.status(201).send({
                        sucsess: true,
                        message: `Welcome to POSTIT!! ${req.body.username}`
                      })
                        .catch(() => {
                          res.status(404).send({
                            error: 'Username or Email already in use'
                          });
                        });
                    });
                });
            });
        }
      });
  },

  listUsers(req, res) {
    return User
      .findAll({ attributes:
        ['id', 'username', 'email'] })
      .then(users => res.status(200).send(users))
      .catch(() => {
        res.status(400).send({
          message: 'Wrong request'
        });
      });
  },

  login(req, res) {
    return User
      .findOne({
        where:
        { username: req.body.username }
      })
      .then((user) => {
        if (!user) {
          res.status(401).send({
            message: 'Username not correct'
          });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          res.status(401).send({
            message: 'Incorrect password'
          });
        }
        if (user) {
          const myToken = jwt.sign({
            id: user.id
          },
          'process.env.SECRET',
          { expiresIn: 24 * 60 * 60 });
          res.status(202).send({
            myToken,
            message: `Welcome back ${req.body.username}`
          });
        }
        res.status(404).send({
          message: 'Validation Error'
        });
      })
      .catch(() => {
        res.status(400).send({
          error: 'Validation error'
        });
      });
  },
  logout(req, res) {
    res.status(200).json({
      message: 'LogOut Successful'
    });
  }
};
