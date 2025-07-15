import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import connectDB from './lib/db';
import authRoutes from './routes/auth.route.js';
import bookRoutes from './routes/book.route.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));


app.use("/api/auth", authRoutes);

app.use("/api/books", bookRoutes);



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})







