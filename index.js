// index.js
import app from './src/app.js';
import sequelize from './src/db.js';

// Sincronizar la base de datos y luego iniciar el servidor
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
  });
});
