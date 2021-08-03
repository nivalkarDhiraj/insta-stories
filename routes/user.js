const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const checkAuth = require('../middlewares/checkAuth');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/', checkAuth, userController.getAll);
router.get('/profile', checkAuth, userController.getProfile);
router.get('/:id', checkAuth, userController.getUser);
router.post('/:id/follow', checkAuth, userController.follow);
router.post('/:id/unfollow', checkAuth, userController.unfollow);

module.exports = router;
