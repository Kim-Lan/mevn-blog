import express from 'express'
import { getPost, getAllPosts, createPost, loginUser, registerUser } from '../controllers/index.js'

const router = express.Router();

router.get('/post/:slug', getPost);

router.get('/posts', getAllPosts);

router.post('/create', createPost);

router.post('/login', loginUser);

router.post('/register', registerUser);

export default router;
