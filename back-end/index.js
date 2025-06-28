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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Middleware to handle body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to handle file uploads
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
// Route: POST /upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ message: 'File uploaded successfully', file: req.file });
});

// Middleware to handle session management
const session = require('express-session');
app.use(session({
  secret: 'your-secret', // Replace with your own secret
  resave: false, 
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
})); // Replace with your own

// Middleware to handle authentication
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  function(username, password, done) {
    // Replace with your own user authentication logic
    if (username === 'user' && password === 'pass') {
      return done(null, { id: 1, username: 'user' });
    } else {
      return done(null, false, { message: 'Incorrect credentials.' });
    }
  }
));
app.use(passport.initialize());
app.use(passport.session());
// Middleware to handle JSON Web Tokens (JWT)
const jwt = require('jsonwebtoken');
const jwtSecret = 'your_jwt_secret'; // Replace with your own secret
// Middleware to protect routes with JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (token) {
    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
}

// Route: POST /login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Replace with your own user authentication logic
  if (username === 'user' && password === 'pass') {
    const user = { id: 1, username: 'user' };
    const token = jwt.sign(user, jwtSecret);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Middleware to handle file downloads
const path = require('path');
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);
  res.download(filePath, (err) => {
    if (err) {
      res.status(404).json({ error: 'File not found' });
    }
  });
}
);

// Middleware to handle WebSocket connections
const http = require('http');
const WebSocket = require('ws');
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
  console.log('New WebSocket connection');
  
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    ws.send(`Echo: ${message}`);
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});


// Middleware to handle GraphQL requests
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);
const root = {
  hello: () => 'Hello, world!'
};
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Enable GraphiQL interface
}));



// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});