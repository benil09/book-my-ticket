import MovieService from "../services/movie.services.js";
import { errResponseBody, successResponseBody } from "../utils/responseBody.js";

export const createMovie = async (req, res) => {
  try {
    const response = await MovieService.createMovie(req.body);

    if (response.err) {
      errResponseBody.err = response.err;
      errResponseBody.code = response.code;
      errResponseBody.message =
        "Validation failed on few parameters of request body";
      return res.status(response.code).json(errResponseBody);
    }
    successResponseBody.data = response;
    return res.status(201).json(successResponseBody);
  } catch (error) {
    console.log(error);
    return res.status(500).json(errResponseBody);
  }
};

export const getMovie = async (req, res) => {
  try {
    const response = await MovieService.getMovieById(req.params.id);
    if (response.err) {
      errResponseBody.err = response.err;
      return res.status(response.code).json(errResponseBody);
    }
    successResponseBody.data = response;
    return res.status(200).json(successResponseBody);
  } catch (error) {
    console.log(error);
    return res.status(500).json(errResponseBody);
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const response = await MovieService.deleteMoviebyid(req.params.id);
    if (!response) {
      errResponseBody.err = "No movie found with the given id";
      return res.status(404).json(errResponseBody);
    }
    successResponseBody.data = response;
    return res.status(200).json(successResponseBody);
  } catch (error) {
    console.log(error);
    return res.status(500).json(errResponseBody);
  }
};
