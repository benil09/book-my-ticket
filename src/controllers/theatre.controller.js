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

export const getAllTheatres = async (req, res) => { 
  try {
    const response = await theatreServices.fetchTheatre(req.query);
    console.log(response)

    if (response.err) {
      errResponseBody.err = response.err;
      errResponseBody.message = "Could not fetch theatres";
      return res.status(response.code).json(errResponseBody);
    }

    successResponseBody.data = response;
    successResponseBody.message = "Fetched all theatres successfully";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    console.log(error);
    errResponseBody.err = error;
    return res.status(500).json(errResponseBody);
  }
};

export const getTheatreById = async (req, res) => {
  try {
    const response = await theatreServices.fetchTheatreById(req.params.id);
    if (response.err) {
      errResponseBody.err = response.err;
      errResponseBody.message = "No theatre found for the given id";
      return res.status(response.code).json(errResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Theatre fetched successfully";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    console.log(error);
    errResponseBody.err = error;
    return res.status(500).json(errResponseBody);
  }
};

export const deleteTheatreById = async (req, res) => {
  try {
    const response = await theatreServices.deleteTheatre(req.params.id);
    if (response.err) {
      errResponseBody.err = response.err;
      errResponseBody.message = "No theatre found for the given id";
      return res.status(response.code).json(errResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Theatre deleted successfully";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    console.log(error);
    errResponseBody.err = error;
    return res.status(500).json(errResponseBody);
  }
};

export const updateTheatreById = async (req, res) => {
  try {
    const response = await theatreServices.updateTheatre(
      req.params.id,
      req.body,
    );
    if (response.err) {
      errResponseBody.err = response.err;
      errResponseBody.message = "No theatre found for the given id";
      return res.status(response.code).json(errResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Theatre updated successfully";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    console.log(error);
    errResponseBody.err = error;
    return res.status(500).json(errResponseBody);
  }
};

/** 
 * 
 * @param  theatreId -> unique id of theatre whose movies are to be updated
 * @param movieIds -> array of movie ids to be added or removed
 * @param insert -> boolean value, true for adding movies, false for removing movies
 * @returns -> the updated theatre object
 */
export const updateMoviesInTheatreById = async (req, res) => {
  try {
      const response = await theatreServices.updateMoviesInTheatre(
          req.params.theatreId,
          req.body.movieIds,
          req.body.insert
      );
      if(response.err){
          errResponseBody.err = response.err;
          return res.status(response.code).json(errResponseBody);
      }
      successResponseBody.data = response;
      successResponseBody.message = "Theatre movies updated successfully";
      return res.status(200).json(successResponseBody);
  } catch (error) {
    console.log(error);
    errResponseBody.err = error;
    return res.status(500).json(errResponseBody);
    
  }
}
