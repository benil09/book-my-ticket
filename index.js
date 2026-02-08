import bodyParser from "body-parser"; // Import body-parser
import dotenv from "dotenv";
import express from "express";
import path from "path";
import connectDB from "./src/config/db.js";
import movieRoute from "./src/routes/movie.route.js";
import theatreRoute from "./src/routes/theatres.route.js";
import mongoose from "mongoose";


const app = express();

app.use(bodyParser.json()); // to parse json body
app.use(bodyParser.urlencoded({ extended: true })); // to parse url encoded body
app.use(express.static(path.join(path.resolve(), "public"))); // to serve static files from public folder

dotenv.config();

//routes
app.use("/bmt/api/v1", movieRoute);
app.use("/bmt/api/v1", theatreRoute);

// mongoose.set('debug',true) //

const port = process.env.PORT;
app.listen(port, async () => {
  //this callback gets executed once we successfully start the server on given port
  console.log(`server started on port ${port}`);
  await connectDB();


});
