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

  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Group.hasMany(models.Message);
        Group.belongsToMany(models.User, {
          through: 'Groupmember',
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Group;
};
