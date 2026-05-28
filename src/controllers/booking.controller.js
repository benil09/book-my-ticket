import { errResponseBody,successResponseBody } from "../utils/responseBody.js";
import bookingService from "../services/booking.services.js"
import {STATUS_CODES} from "../utils/constants.js"

export const createBooking=async (req,res)=>{
    try {
        const userId = req.user;
        const response = await bookingService.createBookingService({...req.body,userId:userId});
       
        successResponseBody.message = "successfully created a booking";
        successResponseBody.data = response;
        

        return res.status(STATUS_CODES.created).json(successResponseBody)
    } catch (error) {
        if (error.err){
            errResponseBody.err = error.err;
            return res.status(error.code).json(errResponseBody); 
        }
        errResponseBody.err = error;
        return res.status(STATUS_CODES.internalServerError).json(errResponseBody)
    }
}

export const updateBooking = async (req,res)=>{
    try {
        
        const bookingId = req.params.id;
        //console.log(req.body)
        const response = await bookingService.updateBookingService(bookingId,req.body);
        
        successResponseBody.message = "Successfuly updated the booking"
        successResponseBody.data  = response

        return res.status(STATUS_CODES.success).json(successResponseBody)

    } catch (error) {
        if(error.err){
            errResponseBody.err=error.err;
            return res.status(error.code).json(errResponseBody)
        }
        errResponseBody.err = error;
        return res.status(STATUS_CODES.internalServerError).json(errResponseBody)
    }
}

