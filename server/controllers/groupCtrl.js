import model from '../models/';

const User = model.User;
const Group = model.Group;
const GroupMembers = model.GroupMember;

export default {
/**
 * @method createGroup
 * @param {object} req 
 * @param { object } res 
 * @returns { object } returns success or error message
 * @description receives user details creates an instance of the Group Model
 */
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
  /**
   * @method listGroups
   * @param {object} req 
   * @param { object } res 
   * @returns { object } returns list of groups
   * @description queries database to fetch list of groups from the Group Model
   */
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
  /**
   * @method addGroupMember
   * @param {object} req 
   * @param { object } res 
   * @returns { object } returns success or error response
   * @description get user and group details and creates an instance of GroupMembers table
   */
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
  /**
   * @method listUserGroups
   * @param {*} req 
   * @param {*} res 
   * @returns { object } returns an object with the list of groups belonging to a user 
   * @description It queries the GroupMembers with the username of the loggin user
   *  Fetches the groups with that username  attached to it
   */
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
  /**
   * @method listGroupMembers
   * @param {*} req 
   * @param {*} res 
   * @returns { object } returns an object with the list of groupmembers in a group 
   * @description It queries the GroupMembers with the groupId of the current group
   *  Fetches the  of group members with that groupId  attached to it
   */

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
  /**
   * @method getCurrentGroup
   * @param {*} req 
   * @param {*} res 
   * @returns { object } returns an object with the name of the current group 
   * @description It queries the GroupMembers with the groupId from the params
   *  Fetches the name of the current group
   */

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
