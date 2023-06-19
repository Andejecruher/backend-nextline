// services/taskService.js
import { Op } from 'sequelize';
import sequelize from '../db.js';
import Task from '../models/Task.js';
import AuditLog from '../models/AuditLog.js';

// Obtener todas las tareas
export async function getAllTasks(offset, limit, where, page, sharedWithCount, daysRemaining, fileFormat) {
  // Construir condiciones de filtrado basadas en los parámetros de consulta
  let filter = {
    ...where,
  };

  // Filtrar por el número de usuarios con los que se comparte la tarea
  if (sharedWithCount) {
    filter = {
      ...filter,
      [Op.and]: [
        sequelize.literal(`JSON_LENGTH(sharedWith) = ${sharedWithCount}`),
      ],
    };
  }

  // Filtrar por la fecha de vencimiento
  if (daysRemaining) {
    filter = {
      ...filter,
      dueDate: {
        [Op.lte]: new Date(new Date().getTime() + daysRemaining * 24 * 60 * 60 * 1000),
      },
    };
  }

  // Filtrar por el formato del archivo adjunto
  if (fileFormat) {
    filter = {
      ...filter,
      file: {
        [Op.like]: `%.${fileFormat}`,
      },
    };
  }

  // Obtener las tareas
  const tasks = await Task.findAndCountAll({
    where: filter,
    offset,
    limit: parseInt(limit),
  });

  // Construir objeto de respuesta
  const data = {
    tasks: tasks.rows,
    totalItems: tasks.count,
    currentPage: parseInt(page),
    totalPages: Math.ceil(tasks.count / limit),
  };

  return data;
}

// Obtener una tarea por ID
export async function getTaskById(taskId) {
  return await Task.findByPk(taskId);
}

// Crear una nueva tarea
export async function createTask(taskData) {
  const task = await Task.create(taskData);
  await AuditLog.create({
    action: 'Create Task',
    taskId: task.id,
  });
  return task;
}

// Actualizar una tarea existente
export async function updateTask(taskId, taskData) {
  const task = await Task.findByPk(taskId);
  await AuditLog.create({
    action: 'Update Task',
    taskId: task.id,
  });
  if (task) {
    await task.update(taskData);
    return task;
  } else {
    throw new Error('Tarea no encontrada');
  }
}

// Eliminar una tarea
export async function deleteTask(taskId) {
  const task = await Task.findByPk(taskId);
  await AuditLog.create({
    action: 'Delete Task',
    taskId: task.id,
    userId: 1,
  });
  if (task) {
    await task.destroy();
  } else {
    throw new Error('Tarea no encontrada');
  }
}
