import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import bookRoutes from "./routes/book.route.js";

import path from "path";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

const __dirname = path.resolve();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);

app.use("/api/books", bookRoutes);

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../clienr","dist")));
  
  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../client","dist","index.html"));
  })
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
