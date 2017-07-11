module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define('Groups', {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    // picture: {
    //   allowNull: true,
    //   type: DataTypes.URL
    // }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Groups.belongsTo(models.Users, {
          foreignKey: 'usersId'
        });
        Groups.hasMany(models.GroupMembers, {
          foreignKey: 'groupsId',
          as: 'groupMembersId'
        });
        Groups.hasMany(models.Messages, {
          foreignKey: 'groupsId',
          as: 'messageId'
        });
      }
    }
  });
  return Groups;
};
