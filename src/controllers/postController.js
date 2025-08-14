const Post = require('../models/Post');

exports.create = async (req, res, next) => {
  try {
    if (!req.body.text || typeof req.body.text !== 'string') {
      return res.status(400).json({ message: 'Text is required' });
    }
    const post = await Post.create({
      text: req.body.text.slice(0, 1000),
      image: req.file?.path || null,
      author: req.userId
    });
    res.status(201).json(post);
  } catch (e) { next(e); }
};

exports.feed = async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || '20', 10), 50);
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      Post.find()
        .populate('author', 'name avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Post.countDocuments()
    ]);

    res.json({ items: posts, page, limit, total });
  } catch (e) { next(e); }
};

exports.byUser = async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || '20', 10), 50);
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      Post.find({ author: req.params.userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Post.countDocuments({ author: req.params.userId })
    ]);

    res.json({ items: posts, page, limit, total });
  } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, author: req.userId });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (typeof req.body.text === 'string') {
      post.text = req.body.text.slice(0, 1000);
    }
    if (req.file?.path) post.image = req.file.path;
    await post.save();
    res.json(post);
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, author: req.userId });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    // Cascade delete related comments and likes
    const Comment = require('../models/Comment');
    const Like = require('../models/Like');
    await Promise.all([
      Comment.deleteMany({ post: post._id }),
      Like.deleteMany({ post: post._id })
    ]);
    res.json({ message: 'Deleted' });
  } catch (e) { next(e); }
};
