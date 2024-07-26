import User from '../models/user.model.js';
import brcyptjs from 'bcryptjs';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password || username === "" || email === "" || password === ""){
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const hashedPassword = brcyptjs.hashSync(password, 10);//also you can do this using await

    //creating a new user
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });


    try {
        await newUser.save();//store user into database
        res.json("Signup successful!");

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }


}