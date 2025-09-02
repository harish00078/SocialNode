const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { getFriends, addFriend, removeFriend } = require('../controllers/friendshipController');

router.get('/', auth, getFriends);
router.post('/add', auth, addFriend);
router.post('/remove', auth, removeFriend);

module.exports = router;
