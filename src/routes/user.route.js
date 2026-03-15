import { updateUser } from "../controllers/user.controller.js";
import userMiddleware from '../middleware/user.middleware.js'
import express from 'express'

const router = express.Router();

router.patch ("/user/:id",userMiddleware.validateUpdateRoleOrStatus,updateUser);

export default router;