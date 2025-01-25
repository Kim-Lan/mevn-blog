import asyncHandler from 'express-async-handler'
import { User } from '../models/user.model.js'
import bcrypt from 'bcrypt';

export const getAllPosts = asyncHandler(async (req, res) => {
  res.json('get all posts');
});

export const createPost = asyncHandler(async (req, res) => {
  res.json('create post');
});

export const loginUser = asyncHandler(async (req, res) => {
  res.json('login user');
});

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ 'error': 'All fields are required'});
  }

  const existingUser = await User.exists({ username: { '$regex': username, $options: 'i' }});
  if (existingUser) {
    res.status(409).json({ 'error': 'Username already taken'});
  }

  const existingEmail = await User.exists({ email });
  if(existingEmail) {
    res.status(409).json({ 'error': 'Email already in use' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ username, email , password: hashedPassword });

  res.status(201).json({ 'message': 'Successfully registered' });
});
