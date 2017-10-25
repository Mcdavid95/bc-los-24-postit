module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      message: {
        allowNull: false,
        type: Sequelize.TEXT
      },

      priority: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'normal',
        isIn: [['normal', 'urgent', 'critical']]
      },
      username: {
        type: Sequelize.STRING,
        allowNull: true
      },


      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      groupId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: null,
        references: {
          model: 'Groups',
          foreignKey: 'id'
        }
      },

      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: null,
        references: {
          model: 'Users',
          foreignKey: 'id',
          as: 'senderId'
        }
      },
    }),
  down: queryInterface =>
    queryInterface.dropTable('Messages')
};

