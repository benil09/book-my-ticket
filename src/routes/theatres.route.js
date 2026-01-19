import express from "express";
import { create } from "../controllers/theatre.controller.js";

const router = express.Router();

// Create a new 
router.post("/theatre",create)
//router.get("/theatre",getTheatres);




export default router;  