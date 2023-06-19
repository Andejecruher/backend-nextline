// src/middlewares/authentication.js
import jwt from 'jsonwebtoken';

// Middleware de autenticación
const authenticationMiddleware = (req, res, next) => {
  // Verificar si se proporciona el token de autenticación en el encabezado de la solicitud
  const token = req.headers.authorization;
  

  if (!token) {
    // Si no se proporciona el token de autenticación, devolver un error
    return res.status(401).json({ error: 'Token de autenticación no proporcionado' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, 'secret_key');
    // Adjuntar el usuario autenticado al objeto de solicitud para su posterior uso
    req.user = decoded.user;
    // Continuar con la siguiente función de middleware
    next();
  } catch (error) {
    // Si el token no es válido, devolver un error
    return res.status(401).json({ error: 'Token de autenticación inválido' });
  }
}

export default authenticationMiddleware;