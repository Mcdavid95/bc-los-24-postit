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
                  username: req.body.username.toLowerCase()
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
                              username: req.body.username.toLowerCase(),
                              password: hash,
                              email: req.body.email.toLowerCase(),
                              phoneNumber: req.body.phoneNumber
                            })
                            .then((detail) => {
                              const myToken = jwt.sign({
                                id: detail.id,
                                name: detail.username,
                                email: detail.email
                              },
                              'process.env.SECRET',
                              { expiresIn: 24 * 60 * 60 });
                              res.status(201).send({
                                myToken,
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

  searchUser(req, res) {
    const limit = 5;
    const offset = req.params.offset;
    User
      .findAndCountAll({
        where: {
          username: { $like: `%${req.body.username}%` }
        },
        attributes: ['id', 'username', 'email'],
        limit,
        offset
      })
      .then((users) => {
        res.status(201).send({
          user: users.rows,
          metadata: paginate(users.count, limit, offset),
        });
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },

  login(req, res) {
    if (typeof (req.body.username) === 'undefined') {
      res.status(409).send({
        message: 'Input username field'
      });
    } else {
      return User
        .findOne({
          where:
        { username: req.body.username.toLowerCase() }
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
              id: user.id,
              name: user.username,
              email: user.email
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
          // res.status(400).send({
          //  message: 'Validation error'
          // });
        });
    }
  },
  logout(req, res) {
    res.status(200).json({
      message: 'LogOut Successful'
    });
  },

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

  authToken(req, res) {
    if (!req.body.token) {
      res.status(400).send({
        success: false,
        message: 'No token provided'
      });
    } else {
      return User
        .findOne({
          where: {
            resetPasswordToken: req.body.token
          }
        })
        .then((user) => {
          if (!user) {
            res.status(400).send({
              success: false,
              message: 'failed token authentication'
            });
          } else {
            res.status(200).send({
              success: true,
              message: 'valid token',
              UserName: user.UserName
            });
          }
        }, (err) => {
          res.status(400).send({
            success: false,
            message: err.message
          });
        });
    }
  }

};
