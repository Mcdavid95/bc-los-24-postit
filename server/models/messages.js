module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message: {
      allowNull: false,
      type: DataTypes.TEXT
    },

    priority: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'normal',
      isIn: [['normal', 'urgent', 'critical']]
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
