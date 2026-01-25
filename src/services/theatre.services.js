import Theatre from "../models/theatre.model.js";

const createTheatre = async (theatreData) => {
  try {
    const response = await Theatre.create(theatreData);
    return response;
  } catch (error) {
    if (error.name == "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      return { err: err, code: 422 };
    }
    console.log(error);
    throw error;
  }
};

const fetchTheatre = async (filter) => {
  try {
    let query = {};
    if (filter.name) {
      query.name == filter.name;
    }
    const response = await Theatre.find();
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const fetchTheatreById = async (id) => {
  try {
    const response = await Theatre.findById(id);
    if (!response) {
      return {
        err: "No theatre found for the given id",
        code: 404,
      };
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteTheatre = async (id) => {
  try {
    const response = await Theatre.findByIdAndDelete(id);
    if (!response) {
      return {
        err: "No theatre found for the given id",
        code: 404,
      };
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateTheatre = async (id, data) => {
  try {
    const response = await Theatre.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return {
        err: "No theatre found for the given id",
        code: 404,
      };
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateMoviesInTheatre = async (theatreId, movieIds, insert) => {
  try {
    const theatre = await Theatre.findById(theatreId);
    if (!theatre) {
      return {
        err: "No theatre found for the given id",
        code: 404,
      };
    }

    if (insert) {
      //add movies
      movieIds.forEach((movieId) => {
        theatre.movies.push(movieId);
      });
    } else {
      //remove movies
      let savedMoviesId = theatre.movies;
      movieIds.forEach((movieId) => {
        savedMoviesId = savedMoviesId.filter((id) => id != movieId);
      });
      theatre.movies = savedMoviesId;
    }

    await theatre.save();
    return theatre.populate('movies');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  createTheatre,
  fetchTheatre,
  fetchTheatreById,
  deleteTheatre,
  updateTheatre,
  updateMoviesInTheatre,
};
