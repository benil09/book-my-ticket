import Booking from "../models/booking.model.js"
import { STATUS_CODES } from "../utils/constants.js";

const createBookingService =async (data)=>{
   try {
        const response = await Booking.create(data);
        return response;
   } catch (error) {
     console.log(error);
     if(error.name == "ValidationError"){
        let err={};
        Object.keys(error.errors).forEach((key)=>{
            err[key] = error.errros[key].message;
        })
        throw {err:err,status:STATUS_CODES.unprocessableEntity};
     }
     throw error;
   }

}

export default {
    createBookingService 
}