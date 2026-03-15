import express from 'express'
import { errResponseBody } from '../utils/responseBody';

const validateUpdateRoleOrStatus = (req,res,next)=>{
   // * check if user role or user status is given in the request body
   if(!req.body.userRole || !req.body.userRole){
      errResponseBody.err = "User role or status is not provided"
      return res.status(400).json(errResponseBody);
   }
   
   next();
}

export default {
    validateUpdateRoleOrStatus
}