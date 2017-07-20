module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    tittle: {
      type: DataTypes.STRING
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
        as: 'senderId'
      },
    },

    priority: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'normal',
      isIn: [['normal', 'urgent', 'critical']]
    },

    groupId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      onDelete: null,
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
