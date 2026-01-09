import express from "express"
import dotenv from "dotenv"
import connectDB from "./src/utils/db.js";


const app = express();


dotenv.config();
app.get('/home',(req,res)=>{
    console.log("Hitting /home route")
    return res.json({success:true , message :"this is a success message"})
})

const port = process.env.PORT;
app.listen(port,async ()=>{
    //this callback gets executed once we successfully start the server on given port
    console.log(`server started on port ${port}`);
    await connectDB();
})