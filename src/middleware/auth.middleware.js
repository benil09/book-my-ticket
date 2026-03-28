import { errResponseBody,successResponseBody } from "../utils/responseBody.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import userService from "../services/user.service.js";
import { USER_ROLE,STATUS_CODES } from "../utils/constants.js";

dotenv.config();

const validateSignUpRequest =async (req,res,next)=>{

 if(!req.body.name){
    errResponseBody.err="Name of the user is not provided"
    return res.status(STATUS_CODES.badRequest).json(errResponseBody); 
 }
 //validate email of the user
 if(!req.body.email){
    errResponseBody.err="Email is not provided"
    return res.status(STATUS_CODES.badRequest).json(errResponseBody)
 }
 if(!req.body.password){
    errResponseBody.err = "Password is not provided"
    return res.status(STATUS_CODES.badRequest).json(errResponseBody)
 }

 next();
}

const validateLoginRequest = async (req,res,next)=>{
   if(!req.body.email){
      errResponseBody.err = "Email is not provided"
      return res.status(STATUS_CODES.badRequest).json(errResponseBody)
   }
   if(!req.body.password){
      errResponseBody.err="Password is not provided"
      return res.status(STATUS_CODES.badRequest).json(errResponseBody)
   }

   next();
}

const isAuthenticated = async (req,res,next)=>{
  try {
    const token = req.headers['x-access-token'];
   if(!token){
      errResponseBody.err = "No token provided"
      return res.status(STATUS_CODES.forbidden).json(errResponseBody)  
   }

   const response = jwt.verify(token,process.env.AUTH_KEY)
   if(!response){
      errResponseBody.err="Token not verified"
      return res.status(STATUS_CODES.unauthorized).json(errResponseBody)
   }

   const user = await userService.getUserById(response.id);
   req.user = user.id
   next();

  } catch (error) {
   if(error.code = STATUS_CODES.notFound){
      errResponseBody.err="User not found"
      return res.status(STATUS_CODES.notFound).json(errResponseBody);
   }

   errResponseBody.err= error;
   return res.status(STATUS_CODES.internalServerError).json(errResponseBody);

   
  }
}

const validateForgotPasswordRequest = (req,res,next)=>{
   // ! check if old password is provided or not
   if(!req.body.oldPass){
      errResponseBody.err = "Old password is necessary to reset password , please enter it "
      return res.status(STATUS_CODES.badRequest).json(errResponseBody)
   }

   // ! check if new password is provided or not
   if(!req.body.newPass){
      errResponseBody.err="New password is required , please enter"
      return res.status(STATUS_CODES.badRequest).json(errResponseBody)
   }
   next();
}

const isAdmin = async (req,res,next)=>{
   const user = await userService.getUserById(req.user);

   if(user.userRole != USER_ROLE.admin){
      errResponseBody.err = "User is not an admin , cannot proceed with the request"
      return res.status(STATUS_CODES.unauthorized).json(errResponseBody)
   }
next();
}

const isClient = async (req,res,next)=>{
   const user = await userService.getUserById(req.user);
   if(user.userRole != USER_ROLE.customer){
      errResponseBody.err = "User is not a customer,cannot proceed with the request"
      return res.status(STATUS_CODES.unauthorized).json(errResponseBody)
   }
   next();
}

const isAdminOrClient = async(req,res,next)=>{
   const user = await userService.getUserById(req.user)
   if(user.userRole != USER_ROLE.admin && user.userRole != USER_ROLE.customer){
      errResponseBody.err = 'user is neither a client nor an admin'
      return res.status(STATUS_CODES.unauthorized).json(errResponseBody)
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