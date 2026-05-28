import express from "express";
import authMiddleware from "../middleware/auth.middleware.js"
import  {validateBookingCreateRequest}  from "../middleware/booking.middleware.js";
import  {createBooking, updateBooking } from "../controllers/booking.controller.js";
import {canChangeStatus} from "../middleware/booking.middleware.js"

const router = express.Router();

router.post("/create" ,authMiddleware.isAuthenticated , validateBookingCreateRequest,createBooking)
router.patch("/update/:id",authMiddleware.isAuthenticated,canChangeStatus,updateBooking)


export default router;