import { createMovie , getMovie , deleteMovie , updateMovie } from "../controllers/movie.controller.js";
import moviesMiddleware from "../middleware/movies.middleware.js";
import express from "express";

const router = express.Router();

router.post("/movies", moviesMiddleware.validateMovieCreateRequest , createMovie);
router.delete("/movies/:id", deleteMovie);
router.get("/movies/:id", getMovie);
router.put("/movies/:id",updateMovie);
router.patch("/movies/:id",updateMovie);

export default router;
