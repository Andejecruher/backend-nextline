// routes/auth.js

import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear el hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la base de datos
    await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar el token JWT
    const token = jwt.sign({ userId: user.id }, 'secret_key');

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Verificar el estado de autenticación
router.get('/status', async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    // Si no se proporciona el token de autenticación, devolver un error
    return res.status(401).json({ message: 'No se proporcionó un token' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, 'secret_key');
    const userId = decoded.userId;

    // Verificar si el usuario existe
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }
    // Devolver el estado de autenticación
    res.json({ userId: user.id, email: user.email });
  } catch (error) {
    // Si el token no es válido, devolver un error
    console.error(error);
    res.status(401).json({ message: 'Token inválido' });
  }
});

export default router;
