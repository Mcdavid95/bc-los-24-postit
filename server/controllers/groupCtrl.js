import model from '../models/';

const Group = model.Group;
const GroupMembers = model.GroupMember;

export default {

  createGroup(req, res) {
    if (!req.body.name) {
      res.status(400).json({ message: 'Please add Group name' });
      return;
    }
    if (!req.body.description) {
      res.status(400).send({ message: 'Add Group Description' });
    } else {
      Group
        .findOne({
          where: {
            name: req.body.name.toLowerCase()
          },
        })
        .then((groupExist) => {
          if (groupExist) {
            res.status(409).send({
              message: 'groupname already exists'
            });
          } else {
            return Group
              .create({
                name: req.body.name.toLowerCase(),
                description: req.body.description.toLowerCase(),
                userId: req.body.userId
              })
              .then((group) => {
                res.status(201).send(`Group ${group.name} successfully created`);
              })
              .catch((error) => {
                res.status(400).send(error);
              });
          }
        });
    }
  },

  listGroups(req, res) {
    return Group
      .findAll({
        attributes:
        ['id', 'name', 'userId']
      })
      .then(groups => res.status(200).send(groups))

      .catch(error => res.status(400).send(error));
  },

  groupMember(req, res) {
    if (!(req.body.name || req.body.email)) {
      res.status(401).send({ message: 'Please add Username' });
    } else {
      GroupMembers
        .findOne({
          where: {
            name: req.body.name
          }
        })
        .then((UserExists) => {
          if (UserExists) {
            res.status(400).send({
              message: `User with username: ${req.body.name} already in this group`
            });
          } else {
            GroupMembers
              .create({
                groupId: req.params.groupId,
                name: req.body.name
              })
              .then(newUser => res.status(200).send({
                message: `Group-Member with Username:${newUser.name} added successfully`
              }))
              .catch((error => res.status(400).send(error)));
          }
        });
    }
  },


  ListgroupMembers(req, res) {
    return GroupMembers

      .findAll({ where: { id: req.params.id } })

      .then(groups => res.status(200).send(groups))

      .catch((error) => {
        res.status(400).send(error);
      });
  },
};
