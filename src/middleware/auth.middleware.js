import { errResponseBody,successResponseBody } from "../utils/responseBody.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import userService from "../services/user.service.js";
import { USER_ROLE } from "../utils/constants.js";

dotenv.config();

const validateSignUpRequest =async (req,res,next)=>{

 if(!req.body.name){
    errResponseBody.err="Name of the user is not provided"
    return res.status(400).json(errResponseBody); 
 }
 //validate email of the user
 if(!req.body.email){
    errResponseBody.err="Email is not provided"
    return res.status(400).json(errResponseBody)
 }
 if(!req.body.password){
    errResponseBody.err = "Password is not provided"
    return res.status(400).json(errResponseBody)
 }

 next();
}

const validateLoginRequest = async (req,res,next)=>{
   if(!req.body.email){
      errResponseBody.err = "Email is not provided"
      return res.status(400).json(errResponseBody)
   }
   if(!req.body.password){
      errResponseBody.err="Password is not provided"
      return res.status(400).json(errResponseBody)
   }

   next();
}

const isAuthenticated = async (req,res,next)=>{
  try {
    const token = req.headers['x-access-token'];
   if(!token){
      errResponseBody.err = "No token provided"
      return res.status(403).json(errResponseBody)  
   }

   const response = jwt.verify(token,process.env.AUTH_KEY)
   if(!response){
      errResponseBody.err="Token not verified"
      return res.status(401).json(errResponseBody)
   }

   const user = await userService.getUserById(response.id);
   req.user = user.id
   next();

  } catch (error) {
   if(error.code = 404){
      errResponseBody.err="User not found"
      return res.status(error.code).json(errResponseBody);
   }

   errResponseBody.err= error;
   return res.status(500).json(errResponseBody);

   
  }
}

const validateForgotPasswordRequest = (req,res,next)=>{
   // ! check if old password is provided or not
   if(!req.body.oldPass){
      errResponseBody.err = "Old password is necessary to reset password , please enter it "
      return res.status(400).json(errResponseBody)
   }

   // ! check if new password is provided or not
   if(!req.body.newPass){
      errResponseBody.err="New password is required , please enter"
      return res.status(400).json(errResponseBody)
   }
   next();
}

const isAdmin = async (req,res,next)=>{
   const user = await userService.getUserById(req.user);

   if(user.userRole != USER_ROLE.admin){
      errResponseBody.err = "User is not an admin , cannot proceed with the request"
      return res.status(401).json(errResponseBody)
   }
next();
}

const isClient = async (req,res,next)=>{
   const user = await userService.getUserById(req.user);
   if(user.userRole != USER_ROLE.customer){
      errResponseBody.err = "User is not a customer,cannot proceed with the request"
      return res.status(401).json(errResponseBody)
   }
   next();
}

const isAdminOrClient = async(req,res,next)=>{
   const user = await userService.getUserById(req.user)
   if(user.userRole != USER_ROLE.admin && user.userRole != USER_ROLE.customer){
      errResponseBody.err = 'user is neither a client nor an admin'
      return res.status(401).json(errResponseBody)
   }
   next();
}

export default {
    validateSignUpRequest,
    validateLoginRequest ,
    isAuthenticated,
    validateForgotPasswordRequest,
    isAdmin,
    isClient,
    isAdminOrClient
   
}