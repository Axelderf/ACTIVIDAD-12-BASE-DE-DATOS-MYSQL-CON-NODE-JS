# Actividad 12 - API REST con Express y MySQL

## Descripción
Aplicación completa de gestión de tareas con autenticación JWT, API REST y frontend HTML/JavaScript.

## Características
- ✅ Configuración de proyecto Node.js con Express
- ✅ Conexión a MySQL con mysql2
- ✅ Autenticación JWT con bcrypt
- ✅ API REST completa (CRUD de tareas)
- ✅ Frontend HTML/JavaScript funcional
- ✅ Validación de datos y manejo de errores

## Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar base de datos MySQL:**
   - Crear base de datos ejecutando el archivo `database.sql`
   - O ejecutar manualmente:
```sql
CREATE DATABASE IF NOT EXISTS actividad12;
USE actividad12;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

3. **Configurar variables de entorno:**
   Crear archivo `.env` en la raíz del proyecto:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=actividad12
DB_PORT=3306
JWT_SECRET=mi_secreto_jwt_super_seguro
PORT=3000
```

## Uso

1. **Iniciar servidor:**
```bash
npm run dev
```

2. **Acceder a la aplicación:**
   - Abrir navegador en: `http://localhost:3000`

## Endpoints de la API

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión

### Tareas (requieren autenticación)
- `GET /api/tasks` - Obtener tareas del usuario
- `POST /api/tasks` - Crear nueva tarea
- `PUT /api/tasks/:id` - Actualizar tarea
- `DELETE /api/tasks/:id` - Eliminar tarea

## Estructura del Proyecto
```
├── config/
│   └── db.js              # Configuración de base de datos
├── controllers/
│   ├── authController.js   # Controlador de autenticación
│   └── taskController.js   # Controlador de tareas
├── middleware/
│   └── authMiddleware.js   # Middleware de autenticación JWT
├── models/
│   ├── User.js            # Modelo de usuario
│   └── Task.js            # Modelo de tarea
├── routes/
│   ├── authRoutes.js      # Rutas de autenticación
│   └── taskRoutes.js      # Rutas de tareas
├── public/
│   ├── index.html         # Frontend HTML
│   └── script.js          # JavaScript del frontend
├── app.js                 # Archivo principal
├── database.sql           # Script de base de datos
└── package.json
```

## Funcionalidades del Frontend
- Registro e inicio de sesión de usuarios
- Crear, editar, eliminar y marcar tareas como completadas
- Interfaz responsive y moderna
- Almacenamiento de token en localStorage
- Manejo de errores y mensajes de éxito

## Tecnologías Utilizadas
- **Backend:** Node.js, Express, MySQL
- **Autenticación:** JWT, bcrypt
- **Frontend:** HTML, CSS, JavaScript vanilla
- **Base de datos:** MySQL con mysql2 