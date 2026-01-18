import express from "express";

const router = express.Router();

// Create a new 
router.post("/",createTheatre)
router.get("/",getTheatres);



export default router;  