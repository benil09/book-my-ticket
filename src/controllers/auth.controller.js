import userService from '../services/user.service.js'
import { errResponseBody, successResponseBody } from "../utils/responseBody.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

export const signup =  async (req,res)=>{
    try {
        const response = await userService.createUser(req.body);
        successResponseBody.data = response;
        successResponseBody.message = "User created successfully";
        return res.status(200).json(successResponseBody)

    } catch (error) {
        console.log(error);
        if(error.err){
            errResponseBody.err=error.err
            return res.status(error.code).json(errResponseBody);
        }
        errResponseBody.err = error;
        return res.status(500).json(errResponseBody)
        
    }
}

export const login = async ( req, res )=>{
    try {
        const user = await userService.getUserByemail(req.body.email);
        const isValidPassword = await user.isValidPassword(req.body.password);
        if(!isValidPassword){
            throw {err:"invalid password for the given email",code:401}
        }
        const token = jwt.sign({id:user.id , email:user.email},process.env.AUTH_KEY,{expiresIn:'1h'})
        console.log(jwt.verify(token,process.env.AUTH_KEY))
        successResponseBody.message = "successfully logged in";
        successResponseBody.data = {email :user.email,role:user.userRole , status:user.userStatus, token:token }
        return res.status(200).json(successResponseBody);
        
    } catch (error) {
        console.log(error)
        if(error.err){
            errResponseBody.err = error.err;
            return res.status(error.code).json(errResponseBody)
        }
        errResponseBody.err = error;
        return res.status(500).json(errResponseBody);
        
    }

}

export const resetPassword = async (req,res)=>{
    try {
        const user = await userService.getUserById(req.user);
        const isOldPasswordCorrect = await user.isValidPassword(req.body.oldPass);

        if(!isOldPasswordCorrect){
            throw {err:"Invalid old password,please write the correct one",code:403}
        }
        user.password = req.body.newPass
        await user.save();

        successResponseBody.data = user;
        successResponseBody.message = "successfully updated the password"

        return res.status(200).json(successResponseBody)

        
    } catch (error) {
        if(error.err){
            errResponseBody.err = error.err;
            return res.status(error.code).json(errResponseBody)
        }
        errResponseBody.err= error;
        return res.status(500).json(errResponseBody)
    }
}
export const logout = async ( req,res)=>{

}

export const forgotPassword = async ( req,res )=>{

}