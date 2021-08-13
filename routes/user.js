const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const checkAuth = require('../middlewares/checkAuth');

router.post('/signup', userController.signup); //user signup
router.post('/login', userController.login);   //user login
router.get('/', checkAuth, userController.getAll); //get all Users
router.get('/profile', checkAuth, userController.getProfile); //get your profile
router.get('/:id', checkAuth, userController.getUser); //get user's profile by profile id
router.post('/:id/follow', checkAuth, userController.follow); //follow the user
router.post('/:id/unfollow', checkAuth, userController.unfollow); //unfollow the user

module.exports = router;
