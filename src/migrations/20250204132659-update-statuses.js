"use strict";

const { sequelize } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Statuses", "createdAt");
    await queryInterface.removeColumn("Statuses", "updatedAt");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Statuses", "createdAt", {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.addColumn("Statuses", "updatedAt", {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
