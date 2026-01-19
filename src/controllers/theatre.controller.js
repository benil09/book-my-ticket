import theatreServices from "../services/theatre.services.js";
import { errResponseBody, successResponseBody } from "../utils/responseBody.js";

export const create = async (req, res) => {
  try {
    const response = await theatreServices.createTheatre(req.body);
    if (response.err) {
      errResponseBody.err = response.err;
      errResponseBody.message =
        "Validation falied on few parameter of the request body";
      return res.status(response.code).json(errResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Theatre created successfully";
    return res.status(201).json(successResponseBody);
  } catch (error) {
    errResponseBody.err = error;
    return res.status(500).json(errResponseBody);
  }
};
