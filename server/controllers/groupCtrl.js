import model from '../models/';

const User = model.User;
const Group = model.Group;
const GroupMembers = model.GroupMember;

export default {

  createGroup(req, res) {
    if (!req.body.groupName) {
      res.status(400).json({ message: 'Please add Group name' });
      return;
    }
    if (!req.body.description) {
      res.status(400).send({ message: 'Add Group Description' });
    } else {
      Group
        .findOne({
          where: {
            GroupName: req.body.groupName.toLowerCase().trim()
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
                GroupName: req.body.groupName.toLowerCase().trim(),
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
      .then(groups => res.status(200).send({
        groups
      }))

      .catch(error => res.status(400).send({
        Error: error.message
      }));
  },

  addGroupMember(req, res) {
    if (isNaN(parseInt(req.params.groupId, 10)) === true) {
      res.status(401).send({ message: 'Please add groupId must be a number' });
    } else if (!(req.body.username || req.body.email)) {
      res.status(401).send({ message: 'Please add Username or email' });
    } else {
      User.findOne({
        where: { username: req.body.username.toLowerCase().trim() }
      })
        .then((user) => {
          if (user) {
            GroupMembers.findOne({
              where: {
                username: req.body.username.toLowerCase().trim(),
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
                          username: req.body.username.toLowerCase().trim(),
                          groupName: groupExist.GroupName,
                          description: groupExist.description,
                          email: user.email,
                          isCreator: false,
                          userId: user.id

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
                  res.status(409).send({
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
        attributes: ['id', 'groupName', 'groupId', 'description']
      })
      .then((group) => {
        res.send({
          group
        });
      });
  },

  ListGroupMembers(req, res) {
    if (isNaN(parseInt(req.params.groupId, 10)) === true) {
      res.status(401).send({ message: 'Please groupId must be a number' });
    } else {
      Group
        .findOne({
          where: { id: req.params.groupId }
        })
        .then((group) => {
          if (group) {
            GroupMembers
              .findAll({ where: { groupId: req.params.groupId } })

              .then(members => res.status(201).send({
                members
              }))

              .catch((error) => {
                res.status(400).send(error);
              });
          } else {
            res.status(404).send({
              Error: `Group with id: ${req.params.groupId} does not exist`
            });
          }
        });
    }
  },

  getCurrentGroup(req, res) {
    if (isNaN(parseInt(req.params.groupId, 10)) === true) {
      res.status(401).send({ message: 'Please groupId must be a number' });
    } else {
      Group
        .findOne({
          where: { id: req.params.groupId },
          attributes: ['id', 'GroupName']
        })
        .then((group) => {
          if (group) {
            return res.status(201).send({
              groupName: group.GroupName
            });
          }
          res.status(404).send({
            Error: 'Group does not exist'
          });
        });
    }
  }
};
