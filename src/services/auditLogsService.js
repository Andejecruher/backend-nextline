// services/taskService.js
import AuditLog from '../models/AuditLog.js';

// Obtener todas las tareas
export async function getAllAuditLogs(offset, limit, where, page) {
  // Obtener las tareas
  const auditLogs = await AuditLog.findAndCountAll({
    where,
    offset,
    limit: parseInt(limit),
  });

  // Construir objeto de respuesta
  const data = {
    auditLogs: auditLogs.rows,
    totalItems: auditLogs.count,
    currentPage: parseInt(page),
    totalPages: Math.ceil(auditLogs.count / limit),
  };

  return data;
}


