// app.js
import express from 'express';
import multer from 'multer';
import path from 'path';

// Middlewares
import authenticationMiddleware from './middlewares/authentication.js';

// Routes
import taskRoutes from './routes/tasks.js';
import authRoutes from './routes/auth.js';

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);

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

// Ruta para subir archivos
app.post('/upload', upload.single('file'), (req, res) => {
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
    console.log(fileData);
    res.send('Archivo subido exitosamente.');
});

app.use(authenticationMiddleware);
app.use('/tasks', taskRoutes);


export default app;
