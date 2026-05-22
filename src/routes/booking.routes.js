import express from "express";
import authMiddleware from "../middleware/auth.middleware.js"
import  {validateBookingCreateRequest}  from "../middleware/booking.middleware.js";
import  {createBooking } from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/create" ,authMiddleware.isAuthenticated , validateBookingCreateRequest,createBooking)


export default router;