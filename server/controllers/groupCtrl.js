import model from '../models/';

const Group = model.Group;
const Message = model.message;
// const GroupMembers = model.GroupMember;

export default {

  createGroup(req, res) {
    if (!req.body.name) {
      res.status(400).json({ message: 'Please add Group name' });
      return;
    }
    if (!req.body.description) {
      res.status(400).send({ message: 'Add Group Description' });

      return;
    }

    return Group
      .create({
        name: req.body.name,
        description: req.body.description
      })
      .then((group) => {
        res.status(201).send(group);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  listGroups(req, res) {
    return Group

      .findAll()

      .then(groups => res.status(200).send(groups))

      .catch(error => res.status(400).send(error));
  },

  groupMember(req, res) {
    return Group

      .findAll({ where: { id: req.params.id } })

      .then(groups => res.status(200).send(groups))

      .catch((error) => {
        res.status(400).send(error);
      });
  },

  message(req, res) {
    return Message

      .create({

        from_user: req.body.from_user,

        to_group: req.body.to_group,

        message: req.body.message,

        priority: req.body.priority

      })
      .then((message) => {
        res.status(200).send(message);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  listMessages(req, res) {
    Message
      .findAll({

        where: { to_group: [req.params.id] },

        attributes: [

          'id',

          'message',

          'from_user',

          'to_group',

          'priority',

          'createdAt'

        ],

      })

      .then(messages => res.status(200).send(messages))

      .catch(error => res.status(404).send(error));
  }
};
