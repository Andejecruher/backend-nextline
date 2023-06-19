# Backend Nextline - Guía de instalación

Esta guía te ayudará a configurar y ejecutar el proyecto Backend Nextline en tu entorno local. A continuación, se detallan los pasos necesarios para montar el proyecto.

## Requisitos previos

Asegúrate de tener instalado lo siguiente en tu sistema:

- Node.js (versión 14 o superior)
- Gestor de bases de datos MySQL

## Pasos de instalación

1. **Clonar el repositorio**

   ```
   $ git clone https://github.com/tu-usuario/backend-nextline.git
   $ cd backend-nextline
   ```

2. **Instalar las dependencias**

   ```
   $ npm install
   ```

3. **Configurar las variables de entorno**

   - Crea un archivo `.env` en la raíz del proyecto.
   - Copia el contenido del archivo `.env.example` en el archivo `.env`.
   - Completa las variables de entorno en el archivo `.env` con la configuración de tu base de datos y cualquier otra configuración necesaria.

4. **Ejecutar las migraciones de la base de datos**

   ```
   $ npm run migrations:run
   ```

5. **Ejecutar los seeders (opcional)**

   Si deseas agregar datos de ejemplo a la base de datos, puedes ejecutar los seeders.

   ```
   $ npm run migrations:seeders:run
   ```

6. **Iniciar el servidor**

   ```
   $ npm run dev
   ```

   Esto iniciará el servidor en modo de desarrollo utilizando Nodemon, lo que permitirá que los cambios se reflejen automáticamente sin reiniciar el servidor.

¡Enhorabuena! Ahora el proyecto Backend Nextline debería estar en funcionamiento en tu entorno local. Puedes acceder a la API a través de `http://localhost:3000`.

## Comandos útiles

- `npm run dev`: Inicia el servidor en modo de desarrollo con Nodemon.
- `npm start`: Inicia el servidor en modo de producción.
- `npm run lint`: Ejecuta el linter para verificar el código.
- `npm run migrations:generate --name <migrationName>`: Genera una nueva migración con el nombre especificado.
- `npm run migrations:run`: Ejecuta todas las migraciones pendientes.
- `npm run migrations:revert`: Revierte la última migración ejecutada.
- `npm run migrations:delete`: Revierte todas las migraciones ejecutadas.
- `npm run migrations:seeders --name <seederName>`: Genera un nuevo seeder con el nombre especificado.
- `npm run migrations:seeders:run`: Ejecuta todos los seeders pendientes.

## Licencia

Este proyecto está bajo la Licencia ISC. Consulta el archivo `LICENSE` para obtener más información.

---

Espero que esta guía te sea útil para montar y ejecutar el proyecto Backend Nextline en tu entorno local. Si tienes alguna pregunta o problema, no dudes en contactarnos. ¡Disfruta programando!