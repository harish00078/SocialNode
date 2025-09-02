const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
  from_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  to_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

friendshipSchema.index({ from_user: 1, to_user: 1 }, { unique: true });

module.exports = mongoose.model('Friendship', friendshipSchema);
