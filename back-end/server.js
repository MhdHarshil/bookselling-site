const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middle 
app.use(bodyParser.urlencoded({ extend: true }))
app.use(express.static('public'));
 
// MongoDB Connnection
mongoose.connect('mongodb://localhost')