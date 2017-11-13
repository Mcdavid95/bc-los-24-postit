import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { resetPasswordMail, sendSuccessfulResetMail } from './emailNotificationCtrl';
import model from '../models/';
import paginate from './pagination';

dotenv.config();
const User = model.User;

const saltRounds = 10;
export default {
  /**
   * @method register
   * @param { object } req
   * @param { object } res
   * @returns { object } returns the response
   * @description recieves useer details and create an instance of the User Model in the database
   */
  register(req, res) {
    if (typeof (req.body.username) === 'undefined') {
      res.status(409).json({
        message: 'Username field must not be empty'
      });
    } else if (typeof (req.body.password) === 'undefined') {
      res.status(409).send({
        message: 'Password field must not be empty'
      });
    } else if (typeof (req.body.email) === 'undefined') {
      res.status(409).send({
        message: 'Email field must not be empty'
      });
    } else if (typeof (req.body.phoneNumber) === 'undefined') {
      res.status(409).send({
        message: 'Phone Number field must not be empty'
      });
    } else {
      User
        .findOne({
          where: {
            phoneNumber: req.body.phoneNumber
          },
        })
        .then((phone) => {
          if (phone) {
            res.status(409).send({ message: 'Phone Number already in use' });
          } else {
            User
              .findOne({
                where: {
                  username: req.body.username.toLowerCase().trim()
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
                        res.status(409).send({ message: 'Email already in use' });
                      }
                      bcrypt.hash(req.body.password, saltRounds)
                        .then((hash) => {
                          User
                            .create({
                              username: req.body.username.toLowerCase().trim(),
                              password: hash,
                              email: req.body.email.toLowerCase(),
                              phoneNumber: req.body.phoneNumber
                            })
                            .then((detail) => {
                              const token = jwt.sign({
                                id: detail.id,
                                name: detail.username,
                                email: detail.email
                              },
                              'process.env.SECRET',
                              { expiresIn: 24 * 60 * 60 });
                              res.status(201).send({
                                token,
                                sucsess: true,
                                message: `Welcome to POSTIT!! ${req.body.username}`
                              });
                            })
                            .catch(() => {
                              res.status(404).send({
                                message: 'phone number already in use'
                              });
                            });
                        });
                    });
                }
              });
          }
        });
    }
  },

  /**
   * @method  listUsers
   * @param { object } req
   * @param { object } res
   * @returns { object } returns the response
   * @description get all users in the database User table
   */
  listUsers(req, res) {
    return User
      .findAll({ attributes:
        ['id', 'username', 'email'] })
      .then(users => res.status(200).send({
        users
      }))
      .catch(() => {
        res.status(400).send({
          message: 'Wrong request'
        });
      });
  },

  /**
   * @method  searchUser
   * @param { object } req
   * @param { object } res
   * @returns { object } returns the response
   * @description get all users in the first (n) users from database User table where n = offset
   */
  searchUser(req, res) {
    const limit = 5;
    const offset = req.query.offset;
    User
      .findAndCountAll({
        where: {
          username: { $like: `%${req.body.username.toLowerCase().trim()}%` }
        },
        attributes: ['id', 'username', 'email'],
        limit,
        offset
      })
      .then((users) => {
        res.status(201).send({
          users: users.rows,
          metadata: paginate(users.count, limit, offset),
        });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },

  /**
   * @method login
   * @param { object } req
   * @param { object } res
   * @returns { object } returns the object containing response and jwt token
   * @description recieves user details and checks if it exists in the database and returns a token
   */
  login(req, res) {
    if (typeof (req.body.username) === 'undefined') {
      res.status(409).send({
        message: 'Input username field'
      });
    } else {
      return User
        .findOne({
          where:
        { username: req.body.username.toLowerCase().trim() }
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
            const token = jwt.sign({
              id: user.id,
              name: user.username,
              email: user.email
            },
            'process.env.SECRET',
            { expiresIn: 24 * 60 * 60 });
            res.status(202).send({
              token,
              message: `Welcome back ${req.body.username}`
            });
          }
          res.status(404).send({
            message: 'Validation Error'
          });
        })
        .catch(() => {
        });
    }
  },

  /**
   * @method logout
   * @param { object } req
   * @param { object } res
   * @returns { object } returns the object containing response and message
   * @description logs out a user
   */
  logout(req, res) {
    res.status(200).json({
      message: 'LogOut Successful'
    });
  },

  /**
   * @method forgotPassword
   * @param { object } req
   * @param { object } res
   * @returns { object } returns the object containing response and reset password token
   * @description recieves user email and creates password token i the database
   */
  forgotPassoword(req, res) {
    if (!req.body.email) {
      res.status(401).send({
        message: 'Please provide your email'
      });
    } else {
      return User
        .findOne({
          where: {
            email: req.body.email
          }
        })
        .then((user) => {
          if (!user) {
            res.status(401).send({
              message: 'Account associated with this email not found'
            });
          } else {
            const token = crypto.randomBytes(20).toString('hex');
            User.update({
              resetPasswordToken: token,
              expiryTime: Date.now() + 3600000
            }, {
              where: {
                email: req.body.email
              }
            })
              .then((updatedUser) => {
                if (updatedUser) {
                  User.findOne({
                    where: {
                      email: req.body.email
                    }
                  })
                    .then((isEmail) => {
                      res.status(201).send({
                        success: true,
                        token: isEmail.resetPasswordToken
                      });
                      resetPasswordMail(isEmail.resetPasswordToken,
                        isEmail.email,
                        req.headers.host
                      );
                    },
                    );
                }
              }, (err) => {
                res.status(400).send({
                  success: false,
                  message: err.message
                });
              });
          }
        }, (err) => {
          res.status(400).send({
            success: false,
            message: err.message
          });
        });
    }
  },

  /**
   * @method reset
   * @param { object } req
   * @param { object } res
   * @returns { object } returns the object containing response and reset password token
   * @description recieves new password details and updates user password in the database User table
   */
  reset(req, res) {
    return User
      .findOne({
        where: {
          resetPasswordToken: req.params.token
        }
      })
      .then((user) => {
        if (!user) {
          res.status(400).send({
            success: false,
            message: 'failed token authentication'
          });
        } else if ((Date.now()) > user.expiryTime) {
          user.update({
            resetPasswordToken: null,
            expiryTime: null
          }, {
            where: {
              resetPasswordToken: req.params.token
            }
          })
            .then(() => {
              res.status(400).send({ success: false });
            }, err => res.status(400).send(err.message));
        } else if (req.body.newPassword &&
            req.body.newPassword.length > 7 &&
            req.body.confirmPassword &&
            req.body.confirmPassword.length > 7 &&
            (req.body.newPassword === req.body.confirmPassword)
        ) {
          user.update({
            password: bcrypt.hashSync(req.body.confirmPassword, 10),
            resetPasswordToken: null,
            expiryTime: null
          })
            .then((updatedUser) => {
              sendSuccessfulResetMail(updatedUser.email);
              res.status(201).send({
                success: true,
                message: 'successfully updated password'
              });
            }, (err) => {
              res.status(400).send({
                success: false,
                message: err.message
              });
            });
        } else {
          res.status(400).send({
            success: false,
            message: 'invalid passwords'
          });
        }
      }, (err) => {
        res.status(400).send({
          success: false,
          message: err.message
        });
      });
  },

};
