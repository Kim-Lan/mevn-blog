import asyncHandler from 'express-async-handler'
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
  const posts = await Post.find().populate({
    path: 'author',
    select: 'username'
  });

  res.status(200).json(posts);
});

export const searchPosts = asyncHandler(async (req, res) => {
  const { query } = req.query;

  const posts = await Post.find({}).populate({
    path: 'author',
    select: 'username'
  });
  const match = posts.filter((post) => {
    const q = query.toLowerCase();
    return post.title.toLowerCase().includes(q) ||
      post.contents.toLowerCase().includes(q) ||
      post.author.username.toLowerCase().includes(q);
  });

  res.status(200).json(match);
});

function deleteFile(path) {
  fs.unlink(path, (err) => {
    if (err) {
      console.error('Error deleting file', err);
    }
  });
}

export const createPost = asyncHandler(async (req, res) => {
  const { title, author, contents } = req.body;
  const cover = req.file

  const slug = getSlug(title);

  const existingPost = await Post.exists({ slug });
  if (existingPost) {
    res.status(409).json({ 'error': 'Post title already exists'});

    if (cover) {
      deleteFile(cover.path);
    }

    return;
  }

  const user = await User.findOne({ username: author });
  if (!user) {
    res.status(404).json({ 'error': 'Username not found'});

    if (cover) {
      deleteFile(cover.path);
    }

    return;
  }

  const post = await Post.create({
    title,
    slug,
    author: user,
    contents,
    date: Date.now(),
    cover: cover ? cover.filename : null,
  });

  res.status(200).json({ ...post.toObject(), author: user.toObject().username });
});

