import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs";
import { USER_ROLE,USER_STATUS } from "../utils/constants.js";


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
        enum:{
            values:Object.values(USER_ROLE),
            message:`{VALUE} is not supported . Supported roles are ${Object.values(USER_ROLE)}` 
        },
        default:USER_ROLE.customer
    },
    userStatus:{
        type:String,
        enum:{
            values:Object.values(USER_STATUS),
            message:`{VALUE} is not supported . Supported status are ${Object.values(USER_STATUS)}`
        },
        default:USER_STATUS.approved,  
        required:true

    }
},{timestamps:true})

userSchema.pre('save',async function(){
    //trigger which is called before saving to encrypt the plain password
    const hash = await bcrypt.hash(this.password,10);
    this.password = hash
})

const User = mongoose.model("User",userSchema )
export default User;

