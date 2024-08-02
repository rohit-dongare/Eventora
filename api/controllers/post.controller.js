import { errorHandler } from '../utils/error.js';
import  Post  from '../models/post.model.js';

export const create = async (req, res, next) => {
    //we have added isAdmin property while creating a cookie to the token when the user sign in along with it's id
    //isAdmin property can be either false or true depends we have given authority to be admin in the database
    //go through auth.controller.js, and verifyToken.js
    if(!req.user.isAdmin){
        return next(errorHandler(403, 'You are not allowed to create a post!'));
    }

    if(!req.body.title || !req.body.content){
        return next(errorHandler(400, 'Please provide all required fields!'));
    }

    const slug = req.body.title
                 .split(' ')
                 .join('-')
                 .toLowerCase()
                 .replace(/[^a-zA-Z0-9-]/g, '');

    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id
    });//req.user.id is coming from verifyToken.js file, we get it from the token
    //we add post with user id as there can be multiple admins in the system that will create a post

    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);

    } catch (error) {
        return next(error);
    }

}