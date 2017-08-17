module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },

    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      // references: {
      //   model: 'User',
      //   key: 'id',
      //   as: 'creatorId'
      // },
    },

  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Group.hasMany(models.Message, {
          foreignKey: 'groupId'
        });
        Group.belongsToMany(models.User, {
          through: 'Groupmember',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Group;
};
