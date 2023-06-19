// Modelo de la tabla Task
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';

class Task extends Model {
  static associate(models) {
    // Asociación con la tabla de bitácora (AuditLog)
    Task.hasMany(models.AuditLog, { foreignKey: 'taskId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Task.belongsTo(models.User, { foreignKey: 'createdBy', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    Task.belongsTo(models.User, { foreignKey: 'responsible', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
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
      set(value) {
        // Verificar si el atributo createdBy ya tiene un valor
        if (this.getDataValue('createdBy')) {
          throw new Error('No se puede modificar el atributo createdBy');
        }
        this.setDataValue('createdBy', value);
      },
    },
    responsible: {
      type: DataTypes.STRING,
      allowNull: true,
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
