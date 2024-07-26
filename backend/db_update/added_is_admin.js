import dotenv  from 'dotenv'
import mongoose from "mongoose";
import UserModel from "../models/User.js";
import path from 'path'
import { fileURLToPath } from 'url';

// Added this extra configuration as dotenv was unable to find env file in root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') })

console.log(process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');

        UserModel.updateMany({}, { $set: { is_admin: false } }, { multi: true })
            .then(res => {
                console.log('Documents updated:', res.nModified);
            })
            .catch(err => {
                console.error('Error updating documents:', err);
            })
            .finally(() => {
                mongoose.connection.close();
            });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });
