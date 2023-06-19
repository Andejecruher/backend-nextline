'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tasks', [
      {
        title: 'Task 1',
        description: 'Description for task 1',
        completionStatus: false,
        dueDate: new Date(),
        isPublic: true,
        createdBy: 'User1',
        responsible: 'User2',
        sharedWith: null,
        comments: null,
        tags: null,
        file: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Task 2',
        description: 'Description for task 2',
        completionStatus: true,
        dueDate: new Date(),
        isPublic: false,
        createdBy: 'User3',
        responsible: 'User4',
        sharedWith: null,
        comments: null,
        tags: null,
        file: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Task 3',
        description: 'Description for task 3',
        completionStatus: true,
        dueDate: new Date(),
        isPublic: false,
        createdBy: 'User3',
        responsible: 'User4',
        sharedWith: null,
        comments: null,
        tags: null,
        file: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Task 4',
        description: 'Description for task 4',
        completionStatus: true,
        dueDate: new Date(),
        isPublic: false,
        createdBy: 'User3',
        responsible: 'User4',
        sharedWith: null,
        comments: null,
        tags: null,
        file: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Task 5',
        description: 'Description for task 5',
        completionStatus: true,
        dueDate: new Date(),
        isPublic: false,
        createdBy: 'User3',
        responsible: 'User4',
        sharedWith: null,
        comments: null,
        tags: null,
        file: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Agrega más tareas aquí si lo deseas
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
