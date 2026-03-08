import User from "../models/user.model.js";
import { USER_ROLE,USER_STATUS  } from "../utils/constants.js";

const createUser = async (data) => {
  try {
    if(!data.userRole || data.userRole ==USER_ROLE.customer){
      if(data.userStatus && data.userStatus != USER_STATUS.approved){
        throw {err:"We cannot set any other status for customer" , code:400}
      }
    }
    if(data.userRole && data.userRole != USER_ROLE.customer){
          data.userStatus = USER_STATUS.pending;
    }
    const response = await User.create(data);
    return response;
  } catch (error) {
    console.log(error);
    if(error.name === "ValidationError"){
      const err={}
      Object.keys(error.errors).forEach((key) => {
        err[key]= error.errors[key].message;
      });
      throw {err:err , code:422};
    }
    throw error;
  }
};

const getUserByemail = async (email) => {
  try {

    const response =await User.findOne({email:email});
    if(!response){
      throw {err:"No user found on this email",code:404}
    }
    return response;
    
  } catch (error) {
    console.log(error);
    throw error
    
  }
}

const getUserById = async (id)=>{
  try {
    const user = await User.findById(id);
    if(!user){
      throw {err:"No user found with the given id",code:404}
    }

    return user;
  } catch (error) {
    console.log(error)
    throw error;
    
  }
}
const logoutUser = async (data) => {}
const forgotPassword = async (data) => {}



export default {
  createUser,
  getUserByemail,
  getUserById,
  logoutUser,
  forgotPassword
};
