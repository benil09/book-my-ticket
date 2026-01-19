import Theatre from "../models/theatre.model.js";

const createTheatre = async (theatreData) => {
  try {
    const response = await Theatre.create(theatreData);
    return response;
  } catch (error) {
    if (error.name == "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key)=>{
        err[key]= error.errors[key].message;
      })
      return {err : err , code:422}
    }
    console.log(error);
    throw error;
  }
};

export default {
  createTheatre,
};
