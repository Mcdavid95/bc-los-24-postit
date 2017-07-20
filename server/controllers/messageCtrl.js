import model from '../models';
import jwt from './jwtVerify';

const Message = model.Message;

export default {

  postMessage(req, res) {
    return Message

      .create({

        userId: jwt.hasToken.id,

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
