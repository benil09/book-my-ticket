import Movie from "../models/movie.model.js";

 const getMovieById = async (id) => {
  
    const movie = await Movie.findById(id);

    if (!movie) {
      return {
        err:"No movie found with the given id",
        code:404,
        // message:"something went wrong while fetching movie details",
        // data:{}
      };
    }
    return movie;
};

export default {
  getMovieById,
};
