import bodyParser from "body-parser"; // Import body-parser
import dotenv from "dotenv";
import express from "express";
import path from "path";
import connectDB from "./src/lib/db.js";
import movieRoute from "./src/routes/movie.route.js";

const app = express();

app.use(bodyParser.json()); // to parse json body
app.use(bodyParser.urlencoded({ extended: true })); // to parse url encoded body
app.use(express.static(path.join(path.resolve(), "public"))); // to serve static files from public folder

dotenv.config();

//routes
app.use("/bmt/api/v1", movieRoute); // to parse json body

const port = process.env.PORT;
app.listen(port, async () => {
  //this callback gets executed once we successfully start the server on given port
  console.log(`server started on port ${port}`);
  await connectDB();
});
