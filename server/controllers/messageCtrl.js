import model from '../models';

const Message = model.Message;

export default {

  postMessage(req, res) {
    return Message

      .create({

        userId: req.body.userId,

        groupId: req.params.groupId,

        content: req.body.content,

        title: req.body.title

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
        where: { groupId: [req.params.id] },
        attributes: ['id', 'message', 'userId', 'groupId'],
      })

      .then(messages => res.status(200).send(messages.attributes))

      .catch(error => res.status(404).send(error));
  }
};
