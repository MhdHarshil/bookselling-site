const express = require('express');
const app = express();

// Route: GET /:word/echo
app.get('/:word/echo', (req, res) => {
  const word = req.params.word;
  res.json({ echo: word });
});

// Route: GET /:word/reverse
app.get('/:word/reverse', (req, res) => { 
  const word = req.params.word;
  const reversedWord = word.split('').reverse().join('');
  res.json({ reversed: reversedWord });
});
// Route: GET /:word/length
app.get('/:word/length', (req, res) => {
  const word = req.params.word;
  const length = word.length;
  res.json({ length: length });
});

// Middleware to handle 404 errors
app.use((req, res) => { 
  res.status(404).json({ error: 'Not Found' });
});

// Middleware to handle errors
app.use((err, req, res, next) => { 
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));  

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to log requests
app.use((req, res, next) => { 
  console.log(`${req.method} ${req.url}`);
  next();
});

// Middleware to handle CORS
app.use((req, res, next) => { 
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Middleware to parse cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Middleware to parse query parameters
app.use((req, res, next) => { 
  req.query = req.query || {};
  next();
});

// Middleware to handle request timeouts
app.use((req, res, next) => { 
  res.setTimeout(5000, () => { // 5 seconds timeout
    res.status(408).json({ error: 'Request Timeout' });
  });
  next();
});

// Middleware to handle compression
const compression = require('compression');

app.use(compression()); 
// Middleware to handle security headers
const helmet = require('helmet');

app.use(helmet());

// Middleware to handle rate limiting
const rateLimit = require('express-rate-limit');  

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});