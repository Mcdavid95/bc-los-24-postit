module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    tittle: {
      type: DataTypes.STRING
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Message.belongsTo(models.User, {
          foreignKey: 'userId'
        });
        Message.belongsTo(models.Group, {
          foreignKey: 'groupId'
        });
      }
    }
  });
  return Message;
};
