# Backend Nextline - Guía de instalación

Esta guía te ayudará a configurar y ejecutar el proyecto Backend Nextline en tu entorno local. A continuación, se detallan los pasos necesarios para montar el proyecto.

## Requisitos previos

Asegúrate de tener instalado lo siguiente en tu sistema:

- Node.js (versión 18.16.0)
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
   or
   $ yarn install
   ```

3. **Configurar las variables de entorno**

   - Crea un archivo `.env` en la raíz del proyecto.
   - Copia el contenido del archivo `.env.example` en el archivo `.env`.
   - Completa las variables de entorno en el archivo `.env` con la configuración de tu base de datos y cualquier otra configuración necesaria.

4. **Ejecutar las migraciones de la base de datos**

   ```
   $ npm run migrations:run
   or
   $ yarn run migrations:run
   ```

5. **Ejecutar los seeders (opcional)**

   Si deseas agregar datos de ejemplo a la base de datos, puedes ejecutar los seeders.

   ```
   $ npm run migrations:seeders:run
   or
   $ yarn run migrations:seeders:run
   ```

6. **Iniciar el servidor**

   ```
   $ npm run dev
   or
   $ yarn run dev
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

## Collection Postman

- Abre Postman e importa el archivo JSON haciendo clic en el botón "Import" en la esquina superior izquierda de la interfaz.
- Selecciona la opción "File" y busca el archivo JSON de Postman en la carpeta raiz del proyecto.
- Haz clic en "Open" para importar el archivo. Postman procesará el archivo y creará una colección con las solicitudes y configuraciones predefinidas.
- Una vez importado, verás la colección en el panel izquierdo de Postman. Puedes expandir la colección para ver las solicitudes individuales.
- Antes de ejecutar las solicitudes, asegúrate de que el servidor Backend Nextline esté en funcionamiento en tu entorno local en la dirección http://localhost:3000, tal como se indica en la guía de instalación.
- Ahora puedes seleccionar una solicitud de la colección y hacer clic en el botón "Send" para enviar la solicitud al servidor. Postman mostrará la respuesta recibida del servidor, lo que te permitirá verificar el funcionamiento de la API y los resultados obtenidos.

## Licencia

Este proyecto está bajo la Licencia ISC. Consulta el archivo `LICENSE` para obtener más información.

---

Espero que esta guía te sea útil para montar y ejecutar el proyecto Backend Nextline en tu entorno local. Si tienes alguna pregunta o problema, no dudes en contactarme. ¡Disfruta programando!. andejecruher@gmail.com