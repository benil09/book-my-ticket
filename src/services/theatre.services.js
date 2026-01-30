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

const fetchTheatre = async (data) => {
  try {
    let query = {};
    let pagination = {};
    if (data && data.city) {
      // this checks whether the city is present in the query params or not
      query.city = data.city;
    }
    if (data && data.PIN) {
      // this checks whether the pincode is present in the query params or not
      query.PIN = data.PIN;
    }

    if (data && data.name) {
      // this checks whether the name is present in the query param or not
      query.name = data.name;
    }

    if (data && data.limit) {
      pagination.limit = data.limit;
    }
    if (data && data.skip) {
      let perPage = data.perPage ? perPage : 3;
      pagination.skip = data.skip * perPage;
    }
    const response = await Theatre.find(query, {}, pagination);
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
    if ((error.name = "ValidationError")) {
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

const updateMoviesInTheatre = async (theatreId, movieIds, insert) => {
  try {
    const theatre = await Theatre.findById(theatreId,{new:true , runValidators:true});
    if (!theatre) {
      return {
        err: "No theatre found for the given id",
        code: 404,
      };
    }

    if (insert) {
      //add movies
      await Theatre.updateOne(
        { _id: theatreId },
        { $addToSet: { movies: { $each: movieIds } } },
      );
    } else {
      //remove movies
      await Theatre.updateOne(
        { _id: theatreId },
        { $pull: { movies: { $in: movieIds } } },
      );
    }

    // await theatre.save();
    return theatre.populate("movies");
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
