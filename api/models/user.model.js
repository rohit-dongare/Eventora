import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: "https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg"
    }
}, {timestamps: true}
);

//User is the name of the model, it will automatically named as Users in database
const User = mongoose.model('User', userSchema);

export default User;