import Movie from "../models/movie.model.js";

const getMovieById = async (id) => {
  const movie = await Movie.findById(id);

  if (!movie) {
    return {
      err: "No movie found with the given id",
      code: 404,
      // message:"something went wrong while fetching movie details",
      // data:{}
    };
  }
  return movie;
};

const createMovie = async (data) => {
  try {
    const movie = await Movie.create(data);
    return movie;
  } catch (error) {
    if (error.name === "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      console.log(err);
      return { err: err, code: 422 };
    } else {
      throw error;
    }
  }
};

const deleteMoviebyid = async (id) => {
  const movie = Movie.findByIdAndDelete(id);
  return movie;
};

export default {
  getMovieById,
  createMovie,
  deleteMoviebyid,
};
