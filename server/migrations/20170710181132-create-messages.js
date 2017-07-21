module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      title: {
        type: Sequelize.STRING
      },

      content: {
        type: Sequelize.STRING
      },

      priority: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'normal',
        isIn: [['normal', 'urgent', 'critical']]
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
      },

      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: null,
        references: {
          model: 'Users',
          key: 'id',
          as: 'senderId'
        }
      },
    }),
  down: queryInterface =>
    queryInterface.dropTable('Messages')
};

