module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('GroupMembers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: null,
      },
      isCreator: {
        type: Sequelize.BOOLEAN
      },

      groupName: {
        type: Sequelize.STRING,
        onDelete: null
      },

      description: {
        type: Sequelize.STRING
      },

      username: {
        type: Sequelize.STRING,
        allowNull: false
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
        type: Sequelize.INTEGER,
        onDelete: null,
      },

    });
  },
  down: queryInterface =>
    queryInterface.dropTable('GroupMembers')
};
