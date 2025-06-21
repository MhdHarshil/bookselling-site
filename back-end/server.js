const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config(); // At the top
const mongoose = require('mongoose');

const app = express();

// Middle 
app.use(bodyParser.urlencoded({ extend: true }))
app.use(express.static('public'));
 
// MongoDB Connnection
mongoose.connect('process.en', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

//Mongoose Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Routes
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'))
});

app.post('/login.html')
