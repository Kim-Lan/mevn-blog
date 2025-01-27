import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import fs from 'fs'
import { User } from '../models/user.model.js'
import { Post } from '../models/post.model.js'
import { getSlug } from '../utils/utils.js'

export const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate({
    path: 'author',
    select: 'username'
  });

  if(!post) {
    res.status(404).json({ 'error': 'Post not found'});
    return;
  }

  res.status(200).json(post);
});

export const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).populate({
    path: 'author',
    select: 'username'
  });

  res.status(200).json(posts);
});

export const createPost = asyncHandler(async (req, res) => {
  const { title, author, contents } = req.body;
  const cover = req.file

  const slug = getSlug(title);

  const existingPost = await Post.exists({ slug });
  if (existingPost) {
    res.status(409).json({ 'error': 'Post title already exists'});
    fs.unlink(cover.path, (err) => {
      if (err) {
        console.error('Error deleting file', err);
      }
    });
    return;
  }

  const user = await User.findOne({ username: author });
  if (!user) {
    res.status(404).json({ 'error': 'Username not found'});
    fs.unlink(cover.path, (err) => {
      if (err) {
        console.error('Error deleting file', err);
      }
    });
    return;
  }

  const post = await Post.create({
    title,
    slug,
    author: user,
    contents,
    date: Date.now(),
    cover: cover.filename,
  });

  res.status(200).json({ ...post.toObject(), author: user.toObject().username });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({ 'message': 'Unauthorized' });
    return;
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    res.status(401).json({ 'message': 'Unauthorized' });
    return;
  }

  const userObj = user.toObject();
  res.status(200).json({
    id: userObj._id,
    username: userObj.username,
    email: userObj.email,
  });
});

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ 'error': 'All fields are required'});
    return;
  }

  const existingUser = await User.exists({ username: { '$regex': username, $options: 'i' }});
  if (existingUser) {
    res.status(409).json({ 'error': 'Username already taken'});
    return;
  }

  const existingEmail = await User.exists({ email });
  if(existingEmail) {
    res.status(409).json({ 'error': 'Email already in use' });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ username, email , password: hashedPassword });

  res.status(201).json({ 'message': 'Successfully registered' });
});
