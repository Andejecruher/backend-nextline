'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      completionStatus: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      dueDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      isPublic: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        }
      },
      responsible: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        }
      },
      sharedWith: {
        type: DataTypes.TEXT, // Use TEXT type to store JSON string
        allowNull: false,
        get() {
          const value = this.getDataValue('sharedWith');
          return value ? JSON.parse(value) : []; // Parse JSON string into array
        },
        set(value) {
          this.setDataValue('sharedWith', JSON.stringify(value)); // Convert array to JSON string
        },
      },
      comments: {
        type: DataTypes.TEXT, // Use TEXT type to store JSON string
        allowNull: false,
        get() {
          const value = this.getDataValue('comments');
          return value ? JSON.parse(value) : []; // Parse JSON string into array
        },
        set(value) {
          this.setDataValue('comments', JSON.stringify(value)); // Convert array to JSON string
        },
      },
      tags: {
        type: DataTypes.TEXT, // Use TEXT type to store JSON string
        allowNull: false,
        get() {
          const value = this.getDataValue('tags');
          return value ? JSON.parse(value) : []; // Parse JSON string into array
        },
        set(value) {
          this.setDataValue('tags', JSON.stringify(value)); // Convert array to JSON string
        },
      },
      file: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tasks');
  }
};
