import { errResponseBody,successResponseBody } from "../utils/responseBody.js"

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



export default {
    validateSignUpRequest
}