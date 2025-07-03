const Task = require('../models/Task');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.getAllByUserId(req.user.id);
    res.json(tasks);
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'El título es requerido' });
    }

    const taskId = await Task.create(title, description || '', req.user.id);
    res.status(201).json({ id: taskId, title, description: description || '', completed: false });
  } catch (error) {
    console.error('Error al crear tarea:', error);
    res.status(500).json({ error: 'Error al crear tarea' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'El título es requerido' });
    }

    const success = await Task.update(id, title, description || '', completed || false, req.user.id);
    
    if (!success) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json({ message: 'Tarea actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar tarea:', error);
    res.status(500).json({ error: 'Error al actualizar tarea' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    const success = await Task.delete(id, req.user.id);
    
    if (!success) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    res.status(500).json({ error: 'Error al eliminar tarea' });
  }
}; 