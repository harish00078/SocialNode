const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { like, unlike, count } = require('../controllers/likeController');

router.get('/:postId/count', auth, count);
router.post('/like', auth, like);
router.post('/unlike', auth, unlike);

module.exports = router;
