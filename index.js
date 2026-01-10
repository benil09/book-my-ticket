import express from "express"
import dotenv from "dotenv"
import connectDB from "./src/utils/db.js";
import movieRoute from "./src/routes/movie.route.js"
import path from "path";


const app = express();


app.use(express.json()); // to parse json body
app.use(express.urlencoded({ extended: true })); // to parse url encoded body
app.use(express.static(path.join(path.resolve(),"public")))
dotenv.config();
app.get('/home',(req,res)=>{
    console.log("Hitting /home route")
    return res.json({success:true , message :"this is a success message"})
})

app.use("/bmt/api/v1",movieRoute) // to parse json body
 


app.use("/bmt/api/v1",movieRoute)

const port = process.env.PORT;
app.listen(port,async ()=>{
    //this callback gets executed once we successfully start the server on given port
    console.log(`server started on port ${port}`);
    await connectDB();
})