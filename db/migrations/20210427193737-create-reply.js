"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("replies", {
      id: {
        type: Sequelize.BIGINT(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      question_id: {
        type: Sequelize.BIGINT(11),
        allowNull: false,
        references: {
          model: "Questions",
          key: "id",
          as: "question_id",
        },
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

      reply: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("replies");
  },
};
