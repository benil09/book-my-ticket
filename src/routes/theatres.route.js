import express from "express";
import {
  create,
  deleteTheatreById,
  getAllTheatres,
  getMovies,
  getTheatreById,
  updateMoviesInTheatreById,
  updateTheatreById,
} from "../controllers/theatre.controller.js";
import theatreMiddleware from "../middleware/theatre.middleware.js";

const router = express.Router();

router.post("/theatre", theatreMiddleware.validateTheatreCreateRequest, create);
router.get("/theatre/:id/movies",getMovies)
router.get("/theatre", getAllTheatres);
router.get("/theatre/:id", getTheatreById);
router.put("/theatre/:id", updateTheatreById);
router.delete("/theatre/:id", deleteTheatreById);
router.patch(
  "/theatre/:theatreId/movies",
  theatreMiddleware.validateUpdateMoviesInTheatreRequest,
  updateMoviesInTheatreById,
);

export default router;
