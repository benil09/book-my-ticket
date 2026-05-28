import express from "express";
import {
  createMovie,
  deleteMovie,
  getAllMovies,
  getMovie,
  updateMovie,
} from "../controllers/movie.controller.js";
import moviesMiddleware from "../middleware/movies.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movie management endpoints
 */

router.post(
  "/movies",
  moviesMiddleware.validateMovieCreateRequest,
  createMovie,
);
router.delete("/movies/:id", deleteMovie);
router.get("/movies/:id", getMovie);
router.put("/movies/:id", updateMovie);
router.patch("/movies/:id", updateMovie);

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Retrieve a list of all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: A list of movies.
 */
router.get("/movies", getAllMovies);

export default router;
