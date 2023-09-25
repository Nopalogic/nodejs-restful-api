import express from 'express';
import userController from '../controllers/user-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';

const userRouter = new express.Router();
userRouter.use(authMiddleware);
userRouter.get('/api/users/:id', userController.getUser);
userRouter.patch('/api/users/:id', userController.updateUser);
userRouter.delete('/api/users/logout', userController.logout);

export { userRouter };
