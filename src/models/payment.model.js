import mongoose from "mongoose";
import { PAYMENT_STATUS } from "../utils/constants";
const paymentSchema = new mongoose.Schema({
    bookingId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"booking"
    },
    amount:{
        type:Number,
        required:true
    },status:{
        type:String,
        required:true,
        enum:{
            values:[PAYMENT_STATUS.success,PAYMENT_STATUS.failed,PAYMENT_STATUS.failed],
            message:"invalid payment status"
            
        },
        default:PAYMENT_STATUS.penidng
    }
},{timestamps:true});


const payments = mongoose.model("Payment",paymentSchema);
export default payments;