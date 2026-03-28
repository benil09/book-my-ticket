import userService from "../services/user.service.js";
import { errResponseBody, successResponseBody } from "../utils/responseBody.js";
import {STATUS_CODES} from "../utils/constants.js"


export const updateUser = async(req,res)=>{
    try {
        
        const response = await userService.updateUserRoleOrStatus(req.body,req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "successfully updated the user"
        return res.status(STATUS_CODES.success).json(successResponseBody);
    } catch (error) {
        if(error.err){
            errResponseBody.err=error.err;
            return res.status(error.code).json(errResponseBody)
        }
        errResponseBody.err=error;
        return res.status(STATUS_CODES.internalServerError).json(errResponseBody)
    }
}