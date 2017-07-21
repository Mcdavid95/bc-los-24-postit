import model from '../models';
import jwt from './jwtVerify';

const Message = model.Message;
const Group = model.Group;

export default {

  postMessage(req, res) {
    Group.findOne({
      where: { id: req.params.groupId }
    })
      .then((group) => {
        if (group) {
          Message

            .create({

              groupId: req.params.groupId,

              content: req.body.content,

              title: req.body.title,

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
            Error: `Group userId: ${req.params.groupId} does not exist`
          });
        }
      });
  },

  listMessages(req, res) {
    Message
      .findAll({
        where: { groupId: req.params.groupId },
        attributes: ['id', 'content', 'userId', 'groupId'],
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
