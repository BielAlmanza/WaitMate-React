const jwt = require('jsonwebtoken');
const User = require('../models/User');

function signAccess(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
}

function signRefresh(payload) {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d' });
}

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nombre, email y contraseña son obligatorios' });
    }
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'El email ya está registrado' });

    const user = await User.create({ name, email, password });
    const token = signAccess({ id: user._id });
    const refreshToken = signRefresh({ id: user._id });
    user.refreshToken = refreshToken;
    await user.save();

    res.status(201).json({ token, refreshToken, user: user.toPublic() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
    const token = signAccess({ id: user._id });
    const refreshToken = signRefresh({ id: user._id });
    user.refreshToken = refreshToken;
    await user.save();

    res.json({ token, refreshToken, user: user.toPublic() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: 'Refresh token requerido' });

    let payload;
    try {
      payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch {
      return res.status(401).json({ message: 'Refresh token inválido' });
    }

    const user = await User.findById(payload.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: 'Refresh token no válido' });
    }

    const token = signAccess({ id: user._id });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { refreshToken: null });
    res.json({ message: 'Sesión cerrada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
