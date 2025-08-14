const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  text: { type: String, required: true, trim: true },
  image: { type: String }, // Cloudinary URL
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

// Indexes for common queries
postSchema.index({ author: 1, createdAt: -1 });
postSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Post', postSchema);
