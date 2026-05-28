import { STATUS_CODES,USER_ROLE,BOOKING_STATUS } from "../utils/constants.js";
import mongoose from 'mongoose'
import { successResponseBody,errResponseBody } from "../utils/responseBody.js";
import theatreService from "../services/theatre.services.js"
import userService from "../services/user.service.js";

const objectId = mongoose.Types.ObjectId


export const validateBookingCreateRequest = async (req,res,next) => {
    //validate theatreId presence
    if(!req.body.theatreId){
        errResponseBody.err="theatre is missing";
        return res.status(STATUS_CODES.badRequest).json(errResponseBody )
    }

    // validate correct theatre id format
    if(!objectId.isValid(req.body.theatreId)){
        errResponseBody.err = "invalid theatre id provided"
        return res.status(STATUS_CODES.badRequest).json(errResponseBody);
    }

    const theatre = await theatreService.fetchTheatreById(req.body.theatreId);
    if(!theatre){
        errResponseBody.err = "No theatre found on the given id";
        return res.status(STATUS_CODES.notFound).json(errResponseBody)
    }


    //validate UserId presence
    //validate movie id presence
    if(!req.body.movieId){
        errResponseBody.err = "Movie id is missing"
        return res.status(STATUS_CODES.badRequest).json(errResponseBody);
    }
    if(!objectId.isValid(req.body.movieId)){
        errResponseBody.err = "Invalid movie id";
        return res.status(STATUS_CODES.badRequest).json(errResponseBody);
    }

    if(!theatre.movies.some(movie=>movie.toString() === req.body.movieId)){
        errResponseBody.err= "given movie id is not present in the requested theatre";
        return res.status(STATUS_CODES.notFound).json(errResponseBody);
    }

    // validate timing presence
    if(!req.body.timing){
        errResponseBody.err = "No movie timing passed";
        return res.status(STATUS_CODES.badRequest).json(errResponseBody);
    }
    //validate no of seats
    if(!req.body.noOfSeats){
        errResponseBody.err = "No seates available"
        return res.status(STATUS_CODES.badRequest).json(errResponseBody)
    }
    
    next();


}

export const canChangeStatus = async (req,res,next)=>{
    try {
        const user = await userService.getUserById(req.user);
        if(user.userRole == USER_ROLE.customer && req.body.status && req.body.status !=BOOKING_STATUS.cancelled ){
            errResponseBody.err = "You are not allowed to change the booking status";
            return res.status(STATUS_CODES.unauthorized).json(errResponseBody);
        }
        next();

    } catch (error) {
        
    }
}
