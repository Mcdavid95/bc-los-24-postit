module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('GroupMembers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
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

    });
  },
  down: queryInterface =>
    queryInterface.dropTable('GroupMembers')
};
