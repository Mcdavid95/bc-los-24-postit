module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },

      phoneNumber: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        unique: true,
        validate: {
          not: ['[a-z]', 'i']
        }
      },

      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
          unique: true
        },
        allowNull: false
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: queryInterface =>
    queryInterface.dropTable('Users')
};
