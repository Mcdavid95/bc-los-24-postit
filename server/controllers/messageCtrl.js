import model from '../models';
import { sendUrgentMail } from './emailNotificationCtrl';

const Message = model.Message;
const Group = model.Group;
const GroupMembers = model.GroupMember;

export default {

  /**
   * @method postMessage
   * @param { object } req
   * @param { object } res
   * @returns { object } returns the response
   * @description recieves message body and create an instance of the Message Model in the database
   */
  postMessage(req, res) {
    if (isNaN(parseInt(req.params.groupId, 10)) === true) {
      res.status(401).send({ message: 'Please groupId must be a number' });
    } else if (typeof (req.body.message) === 'undefined') {
      res.status(404).send({
        Error: 'Message content must not be empty'
      });
    } else if (req.body.message.trim().length === 0) {
      res.status(404).send({
        Error: 'Message content must not be empty'
      });
    } else if (req.body.priority !== 'normal' && req.body.priority !== 'urgent' && req.body.priority !== 'critical') {
      res.status(404).send({
        Error: 'Priority not valid, Please use either: normal, critical, or, urgent'
      });
    } else {
      return Group
        .findOne({
          where: {
            id: req.params.groupId
          },
        })
        .then((group) => {
          if (group) {
            return GroupMembers.findOne({
              where: {
                groupId: req.params.groupId,
                username: req.decoded.name
              }
            })
              .then((inGroup) => {
                if (inGroup) {
                  return Message

                    .create({
                      username: req.decoded.name,

                      userId: req.decoded.id,

                      groupId: req.params.groupId,

                      message: req.body.message,

                      priority: req.body.priority

                    })
                    .then((message) => {
                      GroupMembers.findAll({
                        where: {
                          groupId: req.params.groupId,
                        },

                        attributes: ['userId', 'email']
                      })
                        .then((users) => {
                          if (req.body.priority === 'critical') {
                            sendUrgentMail(users, message);
                          } else if (req.body.priority === 'urgent') {
                            sendUrgentMail(users, message);
                          }
                        });
                      res.status(200).send(message);
                    })
                    .catch((error) => {
                      res.status(400).send(error.message);
                    });
                }
                res.status(404).send({
                  Error: `You do not belong to group with id: ${req.params.groupId}`
                });
              });
          }
          res.status(404).send({
            Error: `Group with id: ${req.params.groupId} does not exist`
          });
        });
    }
  },
  /**
   * @method listMessages
   * @param { object } req
   * @param { object } res
   * @returns { object } returns the response
   * @description queries the Message Model table with the groupId of the current group
   *  and returns all messages with the groupId attached to it
   */
  listMessages(req, res) {
    if (isNaN(parseInt(req.params.groupId, 10)) === true) {
      res.status(401).send({ message: 'Please groupId must be a number' });
    } else {
      return Group
        .findOne({
          where: {
            id: req.params.groupId
          },
        })
        .then((group) => {
          if (group) {
            GroupMembers.findOne({
              where: {
                groupId: req.params.groupId,
                username: req.decoded.name
              }
            })
              .then((inGroup) => {
                if (inGroup) {
                  Message
                    .findAll({
                      where: { groupId: req.params.groupId },
                      attributes: ['id', 'message', 'userId', 'groupId', 'username', 'priority', 'createdAt'],
                    })

                    .then((messages) => {
                      if (messages) {
                        res.status(201).send({
                          messages
                        });
                      } else {
                        res.status(404).send({
                          message: 'No messages found'
                        });
                      }
                    })

                    .catch(error => res.status(404).send(error));
                } else {
                  res.status(403).send({
                    Error: 'You do not belong to this group'
                  });
                }
              });
          } else {
            res.status(404).send({
              Error: 'Group does not exist'
            });
          }
        });
    }
  }
};
