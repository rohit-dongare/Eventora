import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const test = (req, res) => {
    res.json({
        message: 'API is working'
    });
}

export const updateUser = async (req, res, next) => {
    // req.user contains the id, we get it from the token (go through verifyUser.js)
    // req.params.userId, we get it from the route (user.route.js)
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You can only update your own profile!'));
    }

    try {
        const updates = {};

        if (req.body.password) {
            if (req.body.password.length < 6) {
                return next(errorHandler(400, 'Password must be at least 6 characters!'));
            }
            updates.password = bcryptjs.hashSync(req.body.password, 10);
        }

        if (req.body.username) {
            if (req.body.username.length < 7 || req.body.username.length > 20) {
                return next(errorHandler(400, 'Username must be between 7 and 20 characters!'));
            }
            if (req.body.username.includes(' ')) {
                return next(errorHandler(400, 'Username cannot contain spaces!'));
            }
            if (req.body.username !== req.body.username.toLowerCase()) {
                return next(errorHandler(400, 'Username must be lowercase!'));
            }
            if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
                return next(errorHandler(400, 'Username can only contain letters and numbers!'));
            }
            updates.username = req.body.username;
        }

        if (req.body.email) {
            updates.email = req.body.email;
        }

        if (req.body.profilePicture) {
            updates.profilePicture = req.body.profilePicture;
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            { $set: updates },
            { new: true } // If you don't write new: true, then it will return old data and not the updated one to the user
        );

        if (!updatedUser) {
            return next(errorHandler(404, 'User not found!'));
        }

        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest);

    } catch (error) {
        return next(error);
    }
};
