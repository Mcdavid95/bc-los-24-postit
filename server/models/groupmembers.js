module.exports = (sequelize, DataTypes) => {
  const GroupMember = sequelize.define('GroupMember', {
    name: {
      allowNull: false,
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
  }, {
    classMethods: {
      associate: (models) => {
        GroupMember.belongsToMany(models.Group, {
          through: 'GroupMember', foreignKey: 'userId'
        });
      }
    }
  });
  return GroupMember;
};
