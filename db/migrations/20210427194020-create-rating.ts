"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("rating", {
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

      reply_id: {
        type: Sequelize.BIGINT(11),
        allowNull: false,
        references: {
          model: "Replies",
          key: "id",
          as: "reply_id",
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

      status: {
        type: Sequelize.ENUM("question", "reply"),
        allowNull: false,
      },

      type: {
        type: Sequelize.ENUM("up_vote", "down_vote"),
        allowNull: false,
      },

      rating: {
        type: Sequelize.ENUM("0", "1"),
        allowNull: false,
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

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
