import mongoose from "mongoose";

// define movie schema here
const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 50,
    },
    description: {
      type: String,
      required: true,
      minLength: 5,
    },
    casts: {
      type: [String],
      required: true,
    },
    trailerURL: {
      type: String,
      required: true,
    },
    languages: {
      type: [String],
      required: true,
      default: ["Hindi"],
    },
    releaseDate: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    releasedStatus: {
      type: String,
      required: true,
      default: "RELEASED",
    },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema); //creating a new model

export default Movie; // exporting the model