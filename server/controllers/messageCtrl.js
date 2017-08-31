import model from '../models';

const Message = model.Message;
const Group = model.Group;

export default {

  postMessage(req, res) {
    if (typeof (req.body.message) === 'undefined') {
      res.send({
        message: 'Message content must not be empty'
      });
    } else if (req.body.message.trim().length === 0) {
      res.status(304).send({
        message: 'Message content must not be empty'
      });
    } else {
      Group.findOne({
        where: { id: req.params.groupId }
      })
        .then((group) => {
          if (group) {
            Message

              .create({
                username: req.decoded.username,

                userId: req.decoded.id,

                groupId: req.params.groupId,

                message: req.body.message,

                priority: req.body.priority

              })
              .then((message) => {
                res.status(200).send(message);
              })
              .catch((error) => {
                res.status(400).send(error.message);
              });
          } else {
            res.status(404).send({
              Error: `Group with: ${req.params.groupId} does not exist`
            });
          }
        });
    }
  },

  listMessages(req, res) {
    Message
      .findAll({
        where: { groupId: req.params.groupId },
        attributes: ['id', 'message', 'userId', 'groupId'],
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
