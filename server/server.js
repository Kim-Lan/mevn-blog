import express from 'express'
import cookieParser from 'cookie-parser'
import connectDb from './config/db.js'
import path from 'path'
import api from './routes/index.js'

const PORT = process.env.PORT || 3001;

const app = express();

connectDb();

// Middleware for parsing JSON, urlencoded form data, and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', api);
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
);
