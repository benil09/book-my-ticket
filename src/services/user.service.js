import User from "../models/user.model.js"

const createUser = async (data)=>{
    const response = await User.create(data)
    return response;
    try {
        
    } catch (error) {
        console.log(error)
        throw error
    }
}

export default {
    createUser,

}