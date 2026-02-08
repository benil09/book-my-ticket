import mongoose, { mongo } from "mongoose";

const u = mongoose.model()

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    userRole:{
        type:String,
        enum:['CUSTOMER','ADMIN','THEATREOWNER'],
        default:'customer'
    },
    userStatus:{
        type:String,
        enum:['PENDING','APPROVED','REJECTED'],
        default:'PENDING',
        required:true

    }
},{timestamps:true})

const user = mongoose.model("User",userSchema )
export default user;

