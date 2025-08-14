const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { create, forPost, remove } = require('../controllers/commentController');

router.get('/:postId', auth, forPost);
router.post('/', auth, create);
router.delete('/:id', auth, remove);

module.exports = router;
