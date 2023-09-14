const userRouter = require('express').Router();
const userController = require('../controllers/userController');

userRouter.post('/user/login', userController.login);
userRouter.post('/user/register', userController.register, userController.login);
userRouter.get('/user/:id', userController.get);

module.exports = userRouter;