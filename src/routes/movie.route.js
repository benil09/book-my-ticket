import { createMovie , getMovie , deleteMovie } from "../controllers/movie.controller.js";
import express from "express";

const router = express.Router();

router.post("/movies", createMovie);
router.delete("/movies/:id", deleteMovie);
router.get("/movies/:id", getMovie);

export default router;
