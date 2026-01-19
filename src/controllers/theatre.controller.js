import theatreServices from "../services/theatre.services.js";
import {
  errResponseBody,
  successResponseBody,
} from "../utils/responseBody.js";

export const create = async (req, res) => {
  try {
    const response =await theatreServices.createTheatre(req.body);
    successResponseBody.data = response;
    successResponseBody.message = "Theatre created successfully";
    return res.status(201).json(successResponseBody);
  } catch (error) {
    console.log(error);
    errResponseBody.err = error;
    errResponseBody.message = "Unable to create theatre";
    return res.status(500).json(errResponseBody);
  }
};
