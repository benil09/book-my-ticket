const badRequestResponse = {
  success: false,
  err: "",
  data: {},
  message: "malformed request | bad request",
};

const validateMovieCreateRequest = async (req, res, next) => {
  // validate  movie name
  if (!req.body.name) {
    badRequestResponse.err = "Movie name is required";
    return res.status(400).json(badRequestResponse);
  }
  // validate movie description
  if (!req.body.description) {
    badRequestResponse.err = "Movie description is required";
    return res.status(400).json(badRequestResponse);
  }
  // validate the casts
  if (
    !req.body.casts ||
    (!req.body.casts) instanceof Array ||
    req.body.casts.length <= 0
  ) {
    badRequestResponse.err = "Atleast one cast is required";
    return res.status(400).json(badRequestResponse);
  }

  // validate trailerURL
  if (!req.body.trailerURL) {
    badRequestResponse.err = "trailerURL is required";
    return res.status(400).json(badRequestResponse);
  }
  // validate releaseDate
  if (!req.body.releaseDate) {
    badRequestResponse.err = "releaseDate is required";
    return res.status(400).json(badRequestResponse);
  }
  // validate director
  if (!req.body.director) {
    badRequestResponse.err = "director is required";
    return res.status(400).json(badRequestResponse);
  }
  // validate releasedStatus
  if (!req.body.releasedStatus) {
    badRequestResponse.err = "releasedStatus is required";
    return res.status(400).json(badRequestResponse);
  }

  // if all validations are passed

  next();
};

export default {
  validateMovieCreateRequest,
};
