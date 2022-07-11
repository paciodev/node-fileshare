const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const express = require('express');
const mongoose = require('mongoose');
const fileRouter = require('./routes/fileRoutes');

const app = express();
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('Connected to database'));

app.use('/', fileRouter);

app.listen(process.env.PORT, () => {
  console.log('Server starting...');
  console.log(`Server listening on port ${process.env.PORT}`);
});
