const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const { create, feed, byUser, update, remove } = require('../controllers/postController');

// Middleware to handle optional file upload
const optionalUpload = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err && err.code === 'MISSING_FIELD_NAME') {
      // If no file field is provided, continue without error
      return next();
    }
    if (err) {
      return next(err);
    }
    next();
  });
};

router.get('/', auth, feed);
router.get('/user/:userId', auth, byUser);
router.post('/', auth, optionalUpload, create);
router.put('/:id', auth, optionalUpload, update);
router.delete('/:id', auth, remove);

module.exports = router;
