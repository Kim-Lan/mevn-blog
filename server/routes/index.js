import express from 'express'
import { getAllPosts, createPost, loginUser, registerUser } from '../controllers/index.js'

const router = express.Router();

router.get('/posts', getAllPosts);

router.post('/create', createPost);

router.post('/login', loginUser);

router.post('/register', registerUser);

export default router;
