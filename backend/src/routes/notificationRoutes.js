import express from 'express';
import { getNotifications } from '../controllers/notification.controller.js';
import {authMiddleware} from '../middlewares/auth.middleware.js';

const notificationRouter = express.Router();

notificationRouter.get('/getNotifications', authMiddleware, getNotifications);


export default notificationRouter;
