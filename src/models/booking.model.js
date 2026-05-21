import mongoose from "mongoose";
import { BOOKING_STATUS } from "../utils/constants";
const bookingSchema = new mongoose.Schema({
    theatreId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Theatre",
        required:true
    },
    movieId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Movie",
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    timings:{
        type:String ,
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:[BOOKING_STATUS.cancelled,BOOKING_STATUS.pending,BOOKING_STATUS.processing,BOOKING_STATUS.success],
            message:"Invalid booking status"
        },
        default:BOOKING_STATUS.processing
    },
    totalCost:{
        type:Number,
        required:true
    },
    seats:{
        type:Number,
        required:true
    }

},{timestamps:true})

const booking = new mongoose.model("Booking",bookingSchema);

export default booking;