import mongoose from 'mongoose'
const { Schema, model } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    immutable: true,
  },
  contents: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  cover: String,
  coverAlt: String,
});

export const Post = model('Post', postSchema);
