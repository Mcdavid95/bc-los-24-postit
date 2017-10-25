module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message: {
      allowNull: false,
      type: DataTypes.TEXT
    },

    username: {
      type: DataTypes.STRING,
      allowNull: true
    },

    userId: {
      type: DataTypes.INTEGER,
      allownull: true,
    },

    priority: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'normal',
      isIn: [['normal', 'urgent', 'critical']]
    },

    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
