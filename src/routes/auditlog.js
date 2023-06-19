// routes/tasks.js
import express from 'express';
import * as auditLogsService from '../services/auditLogsService.js';

const router = express.Router();


// Obtener todas las tareas
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, action, taskId } = req.query;
  const offset = (page - 1) * limit;
  try {
    // Construir condiciones de filtrado basadas en los parámetros de consulta
    const where = {};
    if (action) {
      where.action = action;
    }
    if (taskId) {
      where.taskId = taskId;
    }
    // Obtener las tareas
    const tasks = await auditLogsService.getAllAuditLogs(offset, limit, where, page);
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las tareas.' });
  }
});

export default router;
