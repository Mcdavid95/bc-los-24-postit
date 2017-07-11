module.exports = (sequelize, DataTypes) => {
  const GroupMembers = sequelize.define('GroupMembers', {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        GroupMembers.belongsTo(models.Groups, {
          foreignKey: 'groupsId',
        });
        GroupMembers.hasMany(models.Messages, {
          foreignKey: 'groupsId'
        });
      }
    }
  });
  return GroupMembers;
};
