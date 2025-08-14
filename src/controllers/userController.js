const User = require('../models/User');

exports.me = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (e) { next(e); }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const update = {
      name: req.body.name,
      bio: req.body.bio
    };
    if (typeof update.name !== 'undefined' && typeof update.name !== 'string') {
      return res.status(400).json({ message: 'Invalid name' });
    }
    if (typeof update.bio !== 'undefined' && typeof update.bio !== 'string') {
      return res.status(400).json({ message: 'Invalid bio' });
    }
    if (req.file?.path) update.avatar = req.file.path;
    // Trim string fields
    if (typeof update.name === 'string') update.name = update.name.trim();
    if (typeof update.bio === 'string') update.bio = update.bio.trim().slice(0, 300);
    const user = await User.findByIdAndUpdate(req.userId, update, { new: true }).select('-password');
    res.json(user);
  } catch (e) { next(e); }
};
