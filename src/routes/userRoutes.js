const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const { me, updateProfile, searchUsers } = require('../controllers/userController');

router.get('/me', auth, me);
router.put('/me', auth, upload.single('avatar'), updateProfile);
router.get('/search', auth, searchUsers);

module.exports = router;
