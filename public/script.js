// Variables globales
let token = localStorage.getItem('token');

// Elementos del DOM
const authSection = document.getElementById('authSection');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const authMessage = document.getElementById('authMessage');
const taskMessage = document.getElementById('taskMessage');

// Verificar si el usuario está autenticado al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    if (token) {
        showDashboard();
        fetchTasks();
    }
});

// Funciones de autenticación
function showLogin() {
    document.getElementById('registerTitle').style.display = 'none';
    registerForm.style.display = 'none';
    document.querySelector('#authSection h2').style.display = 'block';
    loginForm.style.display = 'block';
    authMessage.innerHTML = '';
}

function showRegister() {
    document.querySelector('#authSection h2').style.display = 'none';
    loginForm.style.display = 'none';
    document.getElementById('registerTitle').style.display = 'block';
    registerForm.style.display = 'block';
    authMessage.innerHTML = '';
}

function showDashboard() {
    authSection.classList.remove('active');
    dashboard.classList.add('active');
}

function showAuth() {
    dashboard.classList.remove('active');
    authSection.classList.add('active');
}

function logout() {
    localStorage.removeItem('token');
    token = null;
    showAuth();
    showLogin();
}

// Event listeners para formularios
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            token = data.token;
            localStorage.setItem('token', token);
            showDashboard();
            fetchTasks();
            authMessage.innerHTML = '<div class="success">Inicio de sesión exitoso</div>';
        } else {
            authMessage.innerHTML = `<div class="error">${data.error}</div>`;
        }
    } catch (error) {
        authMessage.innerHTML = '<div class="error">Error de conexión</div>';
    }
});

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            token = data.token;
            localStorage.setItem('token', token);
            showDashboard();
            fetchTasks();
            authMessage.innerHTML = '<div class="success">Registro exitoso</div>';
        } else {
            authMessage.innerHTML = `<div class="error">${data.error}</div>`;
        }
    } catch (error) {
        authMessage.innerHTML = '<div class="error">Error de conexión</div>';
    }
});

// Funciones de tareas
async function fetchTasks() {
    try {
        const response = await fetch('/api/tasks', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const tasks = await response.json();
            displayTasks(tasks);
        } else {
            taskMessage.innerHTML = '<div class="error">Error al cargar tareas</div>';
        }
    } catch (error) {
        taskMessage.innerHTML = '<div class="error">Error de conexión</div>';
    }
}

function displayTasks(tasks) {
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
        taskList.innerHTML = '<li style="text-align: center; color: #666; padding: 20px;">No hay tareas. ¡Crea una nueva!</li>';
        return;
    }

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <div class="task-info ${task.completed ? 'completed' : ''}">
                <div class="task-title">${task.title}</div>
                <div class="task-description">${task.description || 'Sin descripción'}</div>
            </div>
            <div class="task-actions">
                <button onclick="toggleTask(${task.id}, ${!task.completed})">
                    ${task.completed ? 'Desmarcar' : 'Completar'}
                </button>
                <button class="btn-delete" onclick="deleteTask(${task.id})">Eliminar</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;

    try {
        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, description })
        });

        if (response.ok) {
            document.getElementById('taskTitle').value = '';
            document.getElementById('taskDescription').value = '';
            fetchTasks();
            taskMessage.innerHTML = '<div class="success">Tarea creada exitosamente</div>';
        } else {
            const data = await response.json();
            taskMessage.innerHTML = `<div class="error">${data.error}</div>`;
        }
    } catch (error) {
        taskMessage.innerHTML = '<div class="error">Error de conexión</div>';
    }
});

async function toggleTask(id, completed) {
    try {
        const response = await fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ 
                title: 'Tarea actualizada', 
                description: 'Descripción actualizada',
                completed 
            })
        });

        if (response.ok) {
            fetchTasks();
        } else {
            taskMessage.innerHTML = '<div class="error">Error al actualizar tarea</div>';
        }
    } catch (error) {
        taskMessage.innerHTML = '<div class="error">Error de conexión</div>';
    }
}

async function deleteTask(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
        return;
    }

    try {
        const response = await fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            fetchTasks();
            taskMessage.innerHTML = '<div class="success">Tarea eliminada exitosamente</div>';
        } else {
            taskMessage.innerHTML = '<div class="error">Error al eliminar tarea</div>';
        }
    } catch (error) {
        taskMessage.innerHTML = '<div class="error">Error de conexión</div>';
    }
} 