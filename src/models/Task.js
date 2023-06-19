import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';

class Task extends Model {
  static associate(models) {
    // Asociación con la tabla de bitácora (AuditLog)
    Task.hasMany(models.AuditLog, { foreignKey: 'taskId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  }
}

Task.init(
  {
    // Campos de la tarea
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completionStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    responsible: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sharedWith: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    file: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: 'Task',
    paranoid: true,
  }
);

export default Task;
