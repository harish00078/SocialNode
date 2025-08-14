const Comment = require('../models/Comment');

exports.create = async (req, res, next) => {
  try {
    const { text, postId } = req.body;
    if (!text || typeof text !== 'string' || !postId) {
      return res.status(400).json({ message: 'Invalid payload' });
    }
    const comment = await Comment.create({ text, post: postId, author: req.userId });
    res.status(201).json(comment);
  } catch (e) { next(e); }
};

exports.forPost = async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || '20', 10), 100);
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const skip = (page - 1) * limit;
    const [comments, total] = await Promise.all([
      Comment.find({ post: req.params.postId })
        .populate('author', 'name avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Comment.countDocuments({ post: req.params.postId })
    ]);
    res.json({ items: comments, page, limit, total });
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const comment = await Comment.findOneAndDelete({ _id: req.params.id, author: req.userId });
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    res.json({ message: 'Deleted' });
  } catch (e) { next(e); }
};
