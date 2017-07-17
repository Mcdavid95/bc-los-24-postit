// import passportLocalSequelize from 'passport-local-sequelize';
// import sequelize from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },

    phoneNumber: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      unique: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        User.hasMany(models.Group, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
        User.hasMany(models.Message);
        User.belongsToMany(models.Group, {
          through: 'Groupmember',
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
      }
    },
  });
  return User;
};
