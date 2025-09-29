import dotenv from "dotenv";
dotenv.config();
import { app } from "./app.js";

import connectDB from "./db/db.js";
const port=process.env.PORT || 8000;

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Server running on ${port}`);
        
    });
})
.catch((err) => {
    console.log("MONGO DB connection failed !!", err);
    
})