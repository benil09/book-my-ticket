import { updateUser } from "../controllers/user.controller.js";
import userMiddleware from '../middleware/user.middleware.js'
import express from 'express'
import authMiddleware from "../middleware/auth.middleware.js";
const router = express.Router();

router.patch ("/user/:id", authMiddleware.isAuthenticated, userMiddleware.validateUpdateRoleOrStatus, authMiddleware.isAdmin ,updateUser);


export default router;