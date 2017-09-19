import model from '../models';
import { sendUrgentMail } from './emailNotificationCtrl';

const Message = model.Message;
const Group = model.Group;
const GroupMembers = model.GroupMember;

export default {

  postMessage(req, res) {
    if (typeof (req.body.message) === 'undefined') {
      res.status(404).send({
        Error: 'Message content must not be empty'
      });
    } else if (req.body.message.trim().length === 0) {
      res.status(404).send({
        Error: 'Message content must not be empty'
      });
    } else {
      Group.findOne({
        where: { id: req.params.groupId }
      })
        .then((group) => {
          if (group) {
            Message

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
                    console.log(users);
                    if (req.body.priority === 'critical') {
                      sendUrgentMail(users, { message });
                    } else if (req.body.priority === 'urgent') {
                      sendUrgentMail(users, { message });
                    }
                  });
                res.status(200).send(message);
              })
              .catch((error) => {
                res.status(400).send(error.message);
              });
          } else {
            res.status(404).send({
              Error: `Group with id: ${req.params.groupId} does not exist`
            });
          }
        });
    }
  },

  listMessages(req, res) {
    Message
      .findAll({
        where: { groupId: req.params.groupId },
        attributes: ['id', 'message', 'userId', 'groupId', 'username', 'priority'],
      })

      .then((messages) => {
        if (messages) {
          res.send(messages);
        } else {
          res.status(404).send({
            message: 'No messages found'
          });
        }
      })

      .catch(error => res.status(404).send(error));
  }
};
