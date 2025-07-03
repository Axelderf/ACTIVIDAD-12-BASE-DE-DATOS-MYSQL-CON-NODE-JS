const db = require('../config/db');

class Task {
  static async getAllByUserId(userId) {
    const [rows] = await db.query(
      'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  }

  static async create(title, description, userId) {
    const [result] = await db.query(
      'INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)',
      [title, description, userId]
    );
    return result.insertId;
  }

  static async update(id, title, description, completed, userId) {
    const [result] = await db.query(
      'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ? AND user_id = ?',
      [title, description, completed, id, userId]
    );
    return result.affectedRows > 0;
  }

  static async delete(id, userId) {
    const [result] = await db.query(
      'DELETE FROM tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return result.affectedRows > 0;
  }

  static async findById(id, userId) {
    const [rows] = await db.query(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return rows[0];
  }
}

module.exports = Task; 