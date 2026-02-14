import express from 'express'
import { signup } from '../controllers/auth.controller.js';
import authMiddleware from "../middleware/auth.middleware.js"

const router = express.Router();

router.post("/auth/signup",authMiddleware.validateSignUpRequest,signup);


export default router;