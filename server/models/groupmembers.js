module.exports = (sequelize, DataTypes) => {
  const GroupMember = sequelize.define('GroupMember', {
    isCreator: {
      type: DataTypes.BOOLEAN,
    },
    userId: {
      type: DataTypes.STRING
    },
    groupId: {
      type: DataTypes.INTEGER,
      onDelete: null
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false
    }

  }, {
    classMethods: {
      associate: (models) => {
        GroupMember.belongsTo(models.User, {
          foreignKey: 'userId'
        });
        GroupMember.belongsTo(models.Group, {
          foreignKey: 'groupId'
        });
      }
    }
  });
  return GroupMember;
};
