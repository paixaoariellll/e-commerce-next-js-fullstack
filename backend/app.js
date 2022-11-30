const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const cors = require('cors');

cloudinary.config({
  cloud_name: 'dins1fpk3',
  api_key: '368193629939789',
  api_secret: 'hIVbwLkXXheZaW7wNC-VxCj-vqU',
})

const app = express();
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors({ origin: "*" }))

app.get('/', async (req, res, next) => {
  res.send({ message: 'It is working...' });
});

app.post('/upload', async (req, res, next) => {
  try {
    const { images } = req.body
    let promises = []
    images.forEach(async image => {
      promises.push(
        cloudinary.uploader.upload(image,
          {
            folder: 'GameOn'
          }
        )
      )
    });
    const response = await Promise.all(promises)
    res.send(response)
  } catch (error) {
    next(error)
  }
})

app.use('/api', require('./routes/api.route'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));

const public_id = "GameOn/dsbxvkdasvu78k1rgddh"

cloudinary.uploader
  .destroy(public_id)
  .then(response => console.log(response))
  .catch(error => console.log(error.message))
