import userService from "../services/user.service.js";
import { errResponseBody, successResponseBody } from "../utils/responseBody.js";


export const updateUser = async(req,res)=>{
    try {
        console.log(req.params.id)
        const response = await userService.updateUserRoleOrStatus(req.body,req.params.id);
        successResponseBody.data = response;
        successResponseBody.message = "successfully updated the user"
        return res.status(200).json(successResponseBody);
    } catch (error) {
        if(error.err){
            errResponseBody.err=error.err;
            return res.status(error.code).json(errResponseBody)
        }
        errResponseBody.err=error;
        return res.status(500).json(errResponseBody)
    }
}