import express from 'express';

import { signup, signin } from '../controllers/auth.controller.js';

const router = express.Router();

//creating account
router.post('/signup', signup);

//login
router.post('/signin', signin);

export default router;