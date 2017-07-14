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
      },
    }),
  down: queryInterface =>
    queryInterface.dropTable('Messages')
};

