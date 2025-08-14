const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signAccess = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15m' });
const signRefresh = (id) => jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Invalid payload' });
    }
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();
    if (trimmedPassword.length < 6) return res.status(400).json({ message: 'Password too short' });
    const exists = await User.findOne({ email: trimmedEmail });
    if (exists) return res.status(400).json({ message: 'Email already registered' });
    const user = await User.create({ name: trimmedName, email: trimmedEmail, password: trimmedPassword });
    res.status(201).json({ message: 'Registered', user: { id: user._id, name: user.name, email: user.email } });
  } catch (e) { next(e); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
    const user = await User.findOne({ email: String(email).trim().toLowerCase() }).select('+password');
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await user.comparePassword(String(password));
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
    const accessToken = signAccess(user._id);
    const refreshToken = signRefresh(user._id);
    res.json({ accessToken, refreshToken, user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar } });
  } catch (e) { next(e); }
};

exports.refresh = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: 'Missing refresh token' });
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const accessToken = signAccess(decoded.id);
    const refreshToken = signRefresh(decoded.id);
    res.json({ accessToken, refreshToken });
  } catch (e) { next(e); }
};
