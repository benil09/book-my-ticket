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
  try {
    const movie = Movie.findByIdAndDelete(id);
    if (!movie) {
      return {
        err: "No movie found with the given id",
        code: 404,
      };
    }
    return movie;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateMovie = async (id, data) => {
  try {
    const movie = await Movie.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }); // {returnOriginal: false} in mongoose v5 will also work
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

const fetchMovies = async (filter) => {
  let query = {};
  if (filter.name) {
    query.name = filter.name;
  }
  const movies = await Movie.find(query);
  if (!movies) {
    return {
      err: "No movies found",
      code: 404,
    };
  }
  return movies;
};

export default {
  getMovieById,
  createMovie,
  deleteMoviebyid,
  updateMovie,
  fetchMovies,
};
