import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, getposts } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create);//verifyToken, checks if the user is authenticacted 
//as we have added isAdmin property while creaating a cookie when the user sign in along with it's id
//isAdmin property can be either false or true depends we have given authority to be admin in the database

router.get('/getposts', getposts);

export default router;