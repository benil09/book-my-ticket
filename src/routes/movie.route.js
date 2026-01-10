import { createMovie } from "../controllers/movie.controller.js";
import express from "express";

const router = express.Router();

router.post("/movies", createMovie);

export default router;
