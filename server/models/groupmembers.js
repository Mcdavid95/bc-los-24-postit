module.exports = (sequelize, DataTypes) => {
  const GroupMember = sequelize.define('GroupMember', {
    isCreator: {
      type: DataTypes.BOOLEAN,
    },
    userId: {
      type: DataTypes.STRING,
    },
    groupId: {
      type: DataTypes.INTEGER,
      onDelete: null,
    },

    groupName: {
      type: DataTypes.STRING,
      onDelete: null,
    },

    email: {
      type: DataTypes.STRING,
      onDelete: null
    },

    description: {
      type: DataTypes.STRING
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false
    }

  }, {
    classMethods: {
      associate: (model) => {
        GroupMember.belongsTo(model.User, {
          foreignKey: 'userId'
        });
        GroupMember.belongsTo(model.Group, {
          foreignKey: 'groupId'
        });
      }
    }
  });
  return GroupMember;
};
