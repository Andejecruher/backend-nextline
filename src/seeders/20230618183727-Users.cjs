'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Antonio',
        email: 'andejecruher@gmail.com',
        password: await bcrypt.hash('123456789', 10),
        token: '123456789',
        refresh_token: '987654321',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jane',
        email: 'jane.smith@example.com',
        password: await bcrypt.hash('123456789', 10),
        token: 'abcdefghi',
        refresh_token: 'ihgfedcba',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Agrega más usuarios aquí si lo deseas
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
