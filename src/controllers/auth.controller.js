import userService from '../services/user.service.js'
import { errResponseBody, successResponseBody } from "../utils/responseBody.js";

export const signup =  async (req,res)=>{
    try {
        const response = await userService.createUser(req.body);
        successResponseBody.data = response;
        successResponseBody.message = "User created successfully";
        return res.status(200).json(successResponseBody)

    } catch (error) {
        console.log(error)
        errResponseBody.err = error;
        return res.status(500).json(errResponseBody)
        
    }
}