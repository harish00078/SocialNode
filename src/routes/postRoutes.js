const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const { create, feed, byUser, update, remove } = require('../controllers/postController');

router.get('/', auth, feed);
router.get('/user/:userId', auth, byUser);
router.post('/', auth, upload.single('image'), create);
router.put('/:id', auth, upload.single('image'), update);
router.delete('/:id', auth, remove);

module.exports = router;
