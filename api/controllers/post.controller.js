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


//get posts
export const getposts = async (req, res, next) => {
    try {
        // In order to show pagination to the user, we won't fetch all the posts at once.
        // Instead, we will give some limit e.g., initially 9 posts will be fetched,
        // and when the user clicks on the "show more" button, we will show the next remaining posts after that.
        const startIndex = parseInt(req.query.startIndex) || 0; // e.g., we want to start from 9 or 10
        const limit = parseInt(req.query.limit) || 9; // we want to show 3 posts for each 3 rows, so a total of 9 posts at a time
        const sortDirection = req.query.order === 'asc' ? 1 : -1; // we will sort posts in ascending or descending order based on the updated time of that post, when it was last updated

        const posts = await Post.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i' } }
                ],
            }),
        }).sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit);

        const totalPosts = await Post.countDocuments(); // this count will be visible on the dashboard of admin

        const now = new Date();

        // We want to show posts that were created in the last month on the dashboard of admin
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const lastMonthPosts = await Post.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });

        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts
        });
    } catch (error) {
        return next(error);
    }
};



//update post
export const updatepost = async(req, res, next) => {
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(errorHandler(403, 'You are not allowed to update this post!'));
    }

    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                    category: req.body.category,
                    image: req.body.image
                }
            }, { new:true }
        );

        res.status(200).json(updatedPost);

    } catch (error) {
        return  next(error);
    }
}


//delete post
export const deletepost = async(req, res, next) => {
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        return next(errorHandler(403, 'You are not allowed to delete this post!'));
    };

    try {
       await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json('Post has been deleted!');
    } catch (error) {
        return next(error)
    }
}