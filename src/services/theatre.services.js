import Theatre from "../models/theatre.model.js";

const createTheatre = async (theatreData) => {
  try {
    const response = await Theatre.create(theatreData);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createTheatre,
};
