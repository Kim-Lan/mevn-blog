import asyncHandler from 'express-async-handler'

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
  res.json('register user');
});
