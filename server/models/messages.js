module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define('Messages', {
    title: {
      type: DataTypes.STRING
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Messages.belongsTo(models.Users, {
          foreignKey: 'userId'
        });
        Messages.belongsTo(models.Groups, {
          foreignKey: 'groupId'
        });
      }
    }
  });
  return Messages;
};
