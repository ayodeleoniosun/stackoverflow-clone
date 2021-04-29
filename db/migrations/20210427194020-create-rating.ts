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

      reply_id: {
        type: Sequelize.BIGINT(11),
        allowNull: true,
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

      rating: {
        type: Sequelize.ENUM("up_vote", "down_vote"),
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

  down: async (queryInterface) => {
    await queryInterface.dropTable("rating");
  },
};
