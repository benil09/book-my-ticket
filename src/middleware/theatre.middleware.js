const errorBody = {
  success: false,
  err: "",
  data: {},
  message: "malformed request | bad request",
};

const validateTheatreCreateRequest = (req, res, next) => {
  // validate theatre name
  if (!req.body.name) {
    errorBody.err = "Theatre name is required and should be at least 5 characters long";
    return res.status(400).json(errorBody);
  }
  //validate name length
//   if (req.body.name.length < 5) {
//     errorBody.err = "Theatre name must be of atleast 5 characters ";
//     return res.status(400).json(errorBody);
//   }

  // validate PIN
  if (!req.body.PIN) {
    errorBody.err = "PIN is required";
    return res.status(400).json(errorBody);
  }

  //validate city
  if (!req.body.city) {
    errorBody.err = "City is required";
    return res.status(400).json(errorBody);
  }



  // if all validations are passed
  next();
};



export default { validateTheatreCreateRequest };
