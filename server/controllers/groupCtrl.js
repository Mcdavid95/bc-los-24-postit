import model from '../models/';

const User = model.User;
const Group = model.Group;
const GroupMembers = model.GroupMember;

export default {

  createGroup(req, res) {
    // const userId = req.decoded.id;
    if (!req.body.GroupName) {
      res.status(400).json({ message: 'Please add Group name' });
      return;
    }
    if (!req.body.description) {
      res.status(400).send({ message: 'Add Group Description' });
    } else {
      Group
        .findOne({
          where: {
            GroupName: req.body.GroupName.toLowerCase()
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
                GroupName: req.body.GroupName.toLowerCase(),
                description: req.body.description.toLowerCase(),
                userId: req.decoded.id
              })
              .then((group) => {
                if (group) {
                  const groupMember = {
                    groupId: group.id,
                    userId: req.decoded.id,
                    isCreator: true,
                    username: req.decoded.name,
                    groupName: group.GroupName,
                    description: group.description,
                    email: req.decoded.email
                  };
                  GroupMembers.create(groupMember);
                } else {
                  res.status(409).send({
                    message: 'could not add to group'
                  });
                }
                res.status(201).send({
                  message: `Group ${group.GroupName} successfully created`
                });
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
        ['id', 'GroupName']
      })
      .then(groups => res.status(200).send(groups))

      .catch(error => res.status(400).send(error));
  },

  addGroupMember(req, res) {
    if (!(req.body.username || req.body.email)) {
      res.status(401).send({ message: 'Please add Username or email' });
    } else {
      User.findOne({
        where: { username: req.body.username.toLowerCase() }
      })
        .then((user) => {
          if (user) {
            GroupMembers.findOne({
              where: {
                username: req.body.username.toLowerCase(),
                $and: {
                  groupId: req.params.groupId
                }
              }
            })
              .then((inGroup) => {
                if (!inGroup) {
                  Group
                    .findOne({
                      where: {
                        id: req.params.groupId
                      }
                    })
                    .then((groupExist) => {
                      if (groupExist) {
                        GroupMembers.create({
                          groupId: req.params.groupId,
                          username: req.body.username.toLowerCase(),
                          groupName: groupExist.GroupName,
                          description: groupExist.description,
                          email: req.decoded.email,
                          isCreator: false

                        })
                          .then((success) => {
                            if (success) {
                              res.status(200).send({
                                message: 'User sucessfully addded'
                              });
                            }
                          });
                      } else {
                        res.status(401).send({
                          Error: 'Group does not exist'
                        });
                      }
                    })
                    .catch((err) => {
                      res.send(err);
                    });
                } else {
                  res.status(404).send({
                    Error: 'User already in Group'
                  });
                }
              });
          } else {
            res.status(404).send({
              Error: 'User does not exist'
            });
          }
        })
        .catch((error) => {
          res.status(400).send(error);
        });
    }
  },

  listUserGroups(req, res) {
    GroupMembers
      .findAll({
        where: { username: req.decoded.name },
        attributes: ['groupName', 'groupId', 'description']
      })
      .then((group) => {
        res.send(group);
      });
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
