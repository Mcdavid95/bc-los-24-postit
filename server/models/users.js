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
      type: DataTypes.DECIMAL,
      unique: true,
      validate: {
        not: ['[a-z]', 'i']
      }
    },

    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    expiryTime: {
      type: DataTypes.STRING,
      allowNull: true
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        User.hasMany(models.Message, {
          foreignKey: 'userId',
          onDelete: null
        });
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
