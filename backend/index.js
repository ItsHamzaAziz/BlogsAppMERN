import express from 'express';
import cors from 'cors';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import accountRoutes from './routes/accountRoutes.js'
import postRoutes from './routes/postRoutes.js'

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

mongoose.connect(mongoDBURL)

app.use('/account', accountRoutes)
app.use('/post', postRoutes)


app.listen(PORT)

