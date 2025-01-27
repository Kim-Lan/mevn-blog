import express from 'express'
import multer from 'multer'
import path from 'path'
import { getPost, getAllPosts, createPost, loginUser, registerUser } from '../controllers/index.js'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname);
    const fileName = `${path.parse(file.originalname).name}-${Date.now()}${fileExtension}`;
    cb(null, fileName);
  }
});

const upload = multer({
  storage
});

const router = express.Router();

router.get('/post/:slug', getPost);

router.get('/posts', getAllPosts);

router.post('/create', upload.single('cover'), createPost);

router.post('/login', loginUser);

router.post('/register', registerUser);

export default router;
