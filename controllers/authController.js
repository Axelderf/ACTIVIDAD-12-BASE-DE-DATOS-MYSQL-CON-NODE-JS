const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar datos
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Crear usuario
    const userId = await User.create(email, password);
    
    // Generar JWT
    const token = jwt.sign(
      { id: userId, email },
      process.env.JWT_SECRET || 'mi_secreto_jwt_super_seguro',
      { expiresIn: '24h' }
    );

    res.status(201).json({ token, userId });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar datos
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    // Buscar usuario
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const isValidPassword = await User.comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    // Generar JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'mi_secreto_jwt_super_seguro',
      { expiresIn: '24h' }
    );

    res.json({ token, userId: user.id });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
}; 