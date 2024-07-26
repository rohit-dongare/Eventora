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
}, {timeStamps: true}
);

//User is the name of the model, it will automatically named as Users in database
const User = mongoose.model('User', userSchema);

export default User;