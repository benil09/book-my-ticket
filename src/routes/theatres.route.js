import express from "express";
import { create } from "../controllers/theatre.controller.js";
import theatreMiddleware from "../middleware/theatre.middleware.js";

const router = express.Router();

// Create a new theatre
router.post("/theatre", theatreMiddleware.validateTheatreCreateRequest, create);
//router.get("/theatre",getTheatres);




export default router;  