'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('AuditLogs', [
      {
        taskId: 1,
        action: 'Task created',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        taskId: 2,
        action: 'Task updated',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('AuditLogs', null, {});
  }
};
