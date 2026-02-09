import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs";


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
        default:'CUSTOMER'
    },
    userStatus:{
        type:String,
        enum:['PENDING','APPROVED','REJECTED'],
        default:'APPROVED',
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

