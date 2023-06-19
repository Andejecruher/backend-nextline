// routes/tasks.js
import express from 'express';
import * as taskService from '../services/taskService.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Define la carpeta de destino para almacenar los archivos subidos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext);
  }
});

// Define las restricciones para los archivos subidos
const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.pdf', '.png', '.jpg'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.includes(ext)) {
      return cb(new Error('Solo se permiten archivos PDF, PNG y JPG.'));
  }

  const allowedMimeTypes = ['application/pdf', 'image/png', 'image/jpeg'];
  if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error('Solo se permiten archivos PDF, PNG y JPG.'));
  }

  cb(null, true);
};
// Configura multer
const upload = multer({
  storage: storage,
  limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: fileFilter
});
// Obtener todas las tareas
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, title, description, isPublic } = req.query;
  const offset = (page - 1) * limit;
  try {
    // Construir condiciones de filtrado basadas en los parámetros de consulta
    const where = {};
    if (title) {
      where.title = title;
    }
    if (description) {
      where.description = description;
    }
    if (isPublic) {
      where.isPublic = isPublic;
    }
    // Obtener las tareas
    const tasks = await taskService.getAllTasks(offset, limit, where, page);
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las tareas.' });
  }
});

// Obtener una tarea por ID
router.get('/:taskId', async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const task = await taskService.getTaskById(taskId);
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la tarea.' });
  }
});

// Crear una nueva tarea
router.post('/', upload.single('file'), async (req, res) => {
  const taskData = req.body;
  
  try {
    const file = req.file;
    // Obtén la ruta del archivo subido
    const filePath = file.path;
    // Guarda la ruta en la base de datos
    // Aquí puedes utilizar tu lógica para guardar la ruta en tu modelo o en tu base de datos

    // Ejemplo de cómo guardar la ruta en un objeto
    const fileData = {
        originalName: file.originalname,
        fileName: file.filename,
        filePath: filePath
    };
    // Imprime el objeto con la información del archivo
    taskData.file = fileData.filePath;
    const newTask = await taskService.createTask(taskData);
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la tarea.' });
  }
});

// Actualizar una tarea existente
router.put('/:taskId', upload.single('file'), async (req, res) => {
  const taskId = req.params.taskId;
  const taskData = req.body;

  // Verificar si se ha cargado un nuevo archivo adjunto
  
  try {
    if (req.file) {
      const file = req.file;
      // Obtén la ruta del archivo subido
      const filePath = file.path;
      // Guarda la ruta en la base de datos
      // Aquí puedes utilizar tu lógica para actualizar la ruta en tu modelo o en tu base de datos
  
      // Ejemplo de cómo actualizar la ruta en el objeto taskData
      taskData.file = filePath;
      const updatedTask = await taskService.updateTask(taskId, taskData);
      res.json(updatedTask);
    } else {
      // Si no se ha cargado un nuevo archivo adjunto, actualiza la tarea sin modificar el archivo adjunto
      const task = await taskService.getTaskById(taskId);
      taskData.file = task.file;
      const updatedTask = await taskService.updateTask(taskId, taskData);
      res.json(updatedTask);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la tarea.' });
  }
});

// Eliminar una tarea
router.delete('/:taskId', async (req, res) => {
  const taskId = req.params.taskId;
  try {
    await taskService.deleteTask(taskId);
    res.status(200).json({ success: 'Tarea eliminada correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la tarea.' });
  }
});

export default router;
