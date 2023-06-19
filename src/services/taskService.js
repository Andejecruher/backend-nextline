// services/taskService.js
import Task from '../models/Task.js';
import AuditLog from '../models/AuditLog.js';

// Obtener todas las tareas
export async function getAllTasks() {
  return await Task.findAll();
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
