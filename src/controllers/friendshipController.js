const Friendship = require('../models/Friendship');
const User = require('../models/User');

exports.getFriends = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate({
      path: 'friends',
      populate: {
        path: 'to_user',
        select: 'name email avatar'
      }
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.friends);
  } catch (e) {
    next(e);
  }
};

exports.addFriend = async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: 'Friend ID is required' });
    if (userId === req.userId) return res.status(400).json({ message: 'You cannot be friends with yourself' });

    const existingFriendship = await Friendship.findOne({ from_user: req.userId, to_user: userId });
    if (existingFriendship) return res.status(400).json({ message: 'You are already friends' });

    const friendship = await Friendship.create({ from_user: req.userId, to_user: userId });
    const reverseFriendship = await Friendship.create({ from_user: userId, to_user: req.userId });

    await User.findByIdAndUpdate(req.userId, { $push: { friends: friendship._id } });
    await User.findByIdAndUpdate(userId, { $push: { friends: reverseFriendship._id } });

    res.status(201).json({ message: 'Friend added' });
  } catch (e) {
    next(e);
  }
};

exports.removeFriend = async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: 'Friend ID is required' });

    const friendship = await Friendship.findOneAndDelete({ from_user: req.userId, to_user: userId });
    const reverseFriendship = await Friendship.findOneAndDelete({ from_user: userId, to_user: req.userId });

    if (friendship) {
      await User.findByIdAndUpdate(req.userId, { $pull: { friends: friendship._id } });
    }
    if (reverseFriendship) {
      await User.findByIdAndUpdate(userId, { $pull: { friends: reverseFriendship._id } });
    }

    res.json({ message: 'Friend removed' });
  } catch (e) {
    next(e);
  }
};
