"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("questions", {
      id: {
        type: Sequelize.BIGINT(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      user_id: {
        type: Sequelize.BIGINT(11),
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
          as: "user_id",
        },
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      tags: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      subscribe: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("questions");
  },
};
