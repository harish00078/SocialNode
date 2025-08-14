const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const { me, updateProfile } = require('../controllers/userController');

router.get('/me', auth, me);
router.put('/me', auth, upload.single('avatar'), updateProfile);

module.exports = router;
