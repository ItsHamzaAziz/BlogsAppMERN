import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import accountRoutes from './routes/accountRoutes.js'
import postRoutes from './routes/postRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGODB_URI)

app.use('/account', accountRoutes)
app.use('/post', postRoutes)
app.use('/admin', adminRoutes)


app.listen(process.env.PORT)

