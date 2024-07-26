import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    is_admin: {
        type: Boolean,
        default: false,
        required: true
    }
})

const UserModel = model("User", UserSchema);
export default UserModel;
