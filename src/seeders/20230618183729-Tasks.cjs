'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Crear registros de tareas
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tasks', [
      {
        title: 'Task 1',
        description: 'Description for task 1',
        completionStatus: false,
        dueDate: new Date(),
        isPublic: true,
        createdBy: 1,
        responsible: 2,
        sharedWith: '[1, 2, 3]',
        comments: '["Comment 1", "Comment 2", "Comment 3"]',
        tags: '["Tag 1", "Tag 2", "Tag 3"]',
        file: "File 1",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        title: 'Task 2',
        description: 'Description for task 2',
        completionStatus: false,
        dueDate: new Date(),
        isPublic: true,
        createdBy: 1,
        responsible: 2,
        sharedWith: '[1, 2, 3]',
        comments: '["Comment 1", "Comment 2", "Comment 3"]',
        tags: '["Tag 1", "Tag 2", "Tag 3"]',
        file: "File 1",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        title: 'Task 3',
        description: 'Description for task 3',
        completionStatus: false,
        dueDate: new Date(),
        isPublic: true,
        createdBy: 1,
        responsible: 2,
        sharedWith: '[1, 2, 3]',
        comments: '["Comment 1", "Comment 2", "Comment 3"]',
        tags: '["Tag 1", "Tag 2", "Tag 3"]',
        file: "File 1",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        title: 'Task 4',
        description: 'Description for task 4',
        completionStatus: false,
        dueDate: new Date(),
        isPublic: true,
        createdBy: 1,
        responsible: 2,
        sharedWith: '[1, 2, 3]',
        comments: '["Comment 1", "Comment 2", "Comment 3"]',
        tags: '["Tag 1", "Tag 2", "Tag 3"]',
        file: "File 1",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      },
      {
        title: 'Task 5',
        description: 'Description for task 5',
        completionStatus: false,
        dueDate: new Date(),
        isPublic: true,
        createdBy: 1,
        responsible: 2,
        sharedWith: '[1, 2, 3]',
        comments: '["Comment 1", "Comment 2", "Comment 3"]',
        tags: '["Tag 1", "Tag 2", "Tag 3"]',
        file: "File 1",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
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
