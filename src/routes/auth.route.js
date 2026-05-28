import express from 'express'
import { signup,login , logout , forgotPassword, resetPassword } from '../controllers/auth.controller.js';
import authMiddleware from "../middleware/auth.middleware.js"

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Successfully created a new user
 *       400:
 *         description: Validation error
 */
router.post("/auth/signup",authMiddleware.validateSignUpRequest,signup);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 */
router.post("/auth/login", authMiddleware.validateLoginRequest  ,login);
router.post("/auth/logout",logout);
router.post("/auth/forgot-password",forgotPassword);
router.patch("/auth/reset",authMiddleware.isAuthenticated,authMiddleware.validateForgotPasswordRequest,resetPassword);

export default router;
