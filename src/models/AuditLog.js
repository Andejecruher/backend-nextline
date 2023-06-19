// Model name: AuditLog
import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.js';

class AuditLog extends Model {}

AuditLog.init(
  {
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tasks',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: 'AuditLog',
    paranoid: true,
  }
);

export default AuditLog;
