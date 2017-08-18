module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    GroupName: {
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
      references: {
        model: 'Users',
        key: 'id',
        as: 'creatorId'
      },
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Group.hasMany(models.Message, {
          foreignKey: 'groupId'
        });
        Group.belongsToMany(models.User, {
          through: 'GroupMember',
          foreignKey: 'groupId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Group;
};
