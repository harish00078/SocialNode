const Like = require('../models/Like');
const Post = require('../models/Post');

exports.like = async (req, res, next) => {
  try {
    const { postId } = req.body;
    if (!postId) return res.status(400).json({ message: 'postId required' });
    await Like.findOneAndUpdate(
      { post: postId, user: req.userId },
      { $setOnInsert: { post: postId, user: req.userId } },
      { upsert: true, new: true }
    );
    await Post.updateOne({ _id: postId }, { $addToSet: { likes: req.userId } });
    res.json({ liked: true });
  } catch (e) { next(e); }
};

exports.unlike = async (req, res, next) => {
  try {
    const { postId } = req.body;
    if (!postId) return res.status(400).json({ message: 'postId required' });
    await Like.findOneAndDelete({ post: postId, user: req.userId });
    await Post.updateOne({ _id: postId }, { $pull: { likes: req.userId } });
    res.json({ liked: false });
  } catch (e) { next(e); }
};

exports.count = async (req, res, next) => {
  try {
    const count = await Like.countDocuments({ post: req.params.postId });
    res.json({ postId: req.params.postId, likes: count });
  } catch (e) { next(e); }
};
