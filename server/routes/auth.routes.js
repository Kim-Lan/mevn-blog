import express from 'express'
import { loginUser, createPost } from '../controllers/auth.controller.js'

const auth = express.Router();

auth.post('/login', loginUser);

auth.post('/create-post', createPost);

export default auth;
