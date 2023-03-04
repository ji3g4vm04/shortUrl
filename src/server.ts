import app from "./app.js";
import dotenv from 'dotenv';


import db from './mongoose.js';

dotenv.config();

const port = process.env.PORT || 3000;

db.on('error',() => {
  console.log('mongodn error!')
})

db.once('open',() => [
  console.log('connect successful!')
])

app.listen(3000,() => {
  console.log(`This app is running on port:${port}`);
})