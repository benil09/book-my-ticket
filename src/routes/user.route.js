import { updateUser } from "../controllers/user.controller.js";
import express from 'express'

const router = express.Router();

router.patch ("/user/:id",updateUser);

export default router;