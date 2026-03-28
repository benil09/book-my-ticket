import express from "express";
import {
  create,
  deleteTheatreById,
  getAllTheatres,
  getMovies,
  getTheatreById,
  updateMoviesInTheatreById,
  updateTheatreById,
  checkMovie
} from "../controllers/theatre.controller.js";
import theatreMiddleware from "../middleware/theatre.middleware.js";
import userMiddlewares from '../middleware/auth.middleware.js'
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/theatre",authMiddleware.isAuthenticated,authMiddleware.isAdminOrClient, theatreMiddleware.validateTheatreCreateRequest, create);
router.get("/theatre/:id/movies",getMovies)
router.get("/theatre/:theatreId/movies/:movieId",checkMovie)
router.get("/theatre", getAllTheatres);
router.get("/theatre/:id", getTheatreById);
router.put("/theatre/:id", updateTheatreById);
router.delete("/theatre/:id",authMiddleware.isAuthenticated, deleteTheatreById);
router.patch(
  "/theatre/:theatreId/movies",
  theatreMiddleware.validateUpdateMoviesInTheatreRequest,
  updateMoviesInTheatreById,
);

export default router;
