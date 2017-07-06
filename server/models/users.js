import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


module.exports = (sequalize, DataTypes) => {
  const User = sequalize.define('user', {
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      isEmail: true,
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.String
    }
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.UserGroups, {
          foreignKey: 'userId',
        });
      }
    },

    hooks: {
      beforeCreate: (user, options) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
      },
      beeforeUpdate: {
        if (user._changed.password) {
          user.hashPassword();
        }
      }
    }
  }
  );
  return User;
};
