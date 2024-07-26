import User from '../models/user.model.js';
import brcyptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if(!username || !email || 
        !password || username === "" || 
        email === "" || password === ""
    ){
        next(errorHandler(400, 'All fields are required!'));//custome error handling
        //first the call go to the custome error handling function where we return the error and that error is then 
        //passed to the error handling middleware in index.js file using next() keyword
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
        next(error);
    }//this next will lead to the custome error handling middleware in index.js file


}