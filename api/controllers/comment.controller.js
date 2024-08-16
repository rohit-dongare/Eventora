import Comment from "../models/comment.model.js";
import {errorHandler} from "../utils/error.js";

export const createComment = async(req, res, next) => {
    try {
        const { content, postId, userId } = req.body;

        if(userId !== req.user.id){
            return next(errorHandler(403, 'You are not allowed to create a comment!'));
        }

        const newComment = new Comment({
            content,
            postId,
            userId
        });

        await newComment.save();

        res.status(201).json(newComment);

    } catch (error) {
        return next(error);
    }
}

//for showing the individual posts comments
export const getPostComments = async(req, res, next) => {
     try {
        const comments = await Comment.find({ postId: req.params.postId }).sort({
                             createdAt: -1
                         });

        res.status(200).json(comments);
        
     } catch (error) {
        return next(error);
     }
}

//like comment 
export const likeComment = async(req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if(!comment){
            return next(errorHandler(404, 'Comment not found!'));
        }

        const userIndex = comment.likes.indexOf(req.user.id);

        if(userIndex === -1){
            comment.numberOfLikes += 1;
            comment.likes.push(req.user.id);
        } else {
            //this means the user already liked the comment, we need to remove the like
            //1 means remove content i.e userid in this case from the array index
            
            comment.numberOfLikes -= 1;
            comment.likes.splice(userIndex, 1);
        }

        await comment.save();

        res.status(200).json(comment);

    } catch (error) {
        return next(error);
    }
}