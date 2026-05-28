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
            err[key] = error.errors[key].message;
        })
        throw {err:err,code:STATUS_CODES.unprocessableEntity};
     }
     throw error;
   }

}

const updateBookingService = async (bookingId,data)=>{
    try {
        const response = await Booking.findByIdAndUpdate(bookingId,data,{new:true,runValidators:true});
        if(!response){
            throw{
                err:"No booking found on the given id",
                code:STATUS_CODES.notFound
            }
        }
        return response;
    } catch (error) {
        if(error.name == "ValidationError"){
        let err={};
        Object.keys(error.errors).forEach((key)=>{
            err[key] = error.errors[key].message;
        })
        throw {err:err,code:STATUS_CODES.unprocessableEntity};
     }
     throw error;
    }
}

export default {
    createBookingService ,
    updateBookingService
}