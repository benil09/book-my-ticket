import express from 'express'
import { signup,login , logout , forgotPassword, resetPassword } from '../controllers/auth.controller.js';
import authMiddleware from "../middleware/auth.middleware.js"

const router = express.Router();

router.post("/auth/signup",authMiddleware.validateSignUpRequest,signup);
router.post("/auth/login", authMiddleware.validateLoginRequest  ,login);
router.post("/auth/logout",logout);
router.post("/auth/forgot-password",forgotPassword);
router.patch("/auth/reset",authMiddleware.isAuthenticated,resetPassword);

export default router;
