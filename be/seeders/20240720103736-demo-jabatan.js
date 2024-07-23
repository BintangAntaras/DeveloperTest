'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Jabatans', [
        {
          name: 'FullStack Developer',
          department_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'BackEnd Developer',
          department_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'FrontEnd Developer',
          department_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'HRD',
          department_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Jabatans', null, {});
  }
};
