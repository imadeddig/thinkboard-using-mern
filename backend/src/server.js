import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

import path from "path";

dotenv.config();


const app = express(); // we can now listen on a port
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve()

if(process.env.NODE_ENV !== "production"){
app.use(cors({
    origin: "http://localhost:5173",
})); // should be before the ratelimiter always ! 

}




app.use(express.json()); // allow access to req.body
app.use(rateLimiter) // middleware 


// middleware used for auth check, if logged in or not, before sending a response
// also for rate limiting
app.use("/api/notes", notesRoutes) // prefix endpoints

if(process.env.NODE_ENV === "production"){
    
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*" , (req, res)=>{
    res.sendFile(path.join(__dirname, "../frontend","dist", "index.html"))
})
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening on PORT : ", PORT);
    });
})
