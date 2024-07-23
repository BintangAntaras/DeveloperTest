'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Departments', [
        {
          name: 'Business Development',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Finance',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'General Affairs',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'IT Development',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Departments', null, {});
  }
};
