import model from '../models/';

const User = model.User;
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
            Group
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

  addGroupMember(req, res) {
    if (!(req.body.username || req.body.email)) {
      res.status(401).send({ message: 'Please add Username or email' });
    } else {
      Group
        .findOne({
          where: {
            id: req.params.groupId
          }
        })
        .then((groupExist) => {
          if (groupExist) {
            User.findOne({
              where: { username: req.body.username }
            })
              .then((user) => {
                if (user) {
                  GroupMembers.findOne({
                    where: {
                      username: req.body.username,
                      userId: req.body.userId
                    }
                  })
                    .then((inGroup) => {
                      if (!inGroup) {
                        GroupMembers.create({
                          where: {
                            userId: req.body.userId,
                            groupId: req.params.groupId,
                            username: req.body.username,

                          }
                        })
                          .spread((member, added) => {
                            if (added) {
                              res.status(201).send({
                                message: `New member ${req.body.username} has been successfully added to this group`
                              });
                            } else {
                              res.status(409).send({
                                error: 'An error occured, unable to add user'
                              });
                            }
                          });
                      } else {
                        res.status(401).send({
                          Error: 'User already in group'
                        });
                      }
                    });
                } else {
                  res.status(404).send({
                    Error: 'User does not exist'
                  });
                }
              });
          } else {
            res.status(404).send({
              Error: 'Group does not exist'
            });
          }
        })
        .catch((error) => {
          res.status(400).send(error);
        });
    }
  },

  ListGroupMembers(req, res) {
    Group
      .findOne({
        where: { id: req.params.groupId }
      })
      .then((group) => {
        if (group) {
          GroupMembers
            .findAll({ where: { groupId: req.params.groupId } })

            .then(groups => res.status(200).send(groups))

            .catch((error) => {
              res.status(400).send(error);
            });
        } else {
          res.status(404).send({
            Error: `Group with id: ${req.params.groupId} does not exist`
          });
        }
      });
  },
};
