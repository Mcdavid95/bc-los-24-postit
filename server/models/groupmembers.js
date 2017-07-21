module.exports = (sequelize, DataTypes) => {
  const GroupMember = sequelize.define('GroupMember', {
    username: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    groupId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: null
    },

    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
        as: 'creatorId'
      },
    },
  }, {
    classMethods: {
      associate: (models) => {
        models.User.belongsToMany(models.Group, {
          through: 'GroupMember'
        });
      }
    }
  });
  return GroupMember;
};
