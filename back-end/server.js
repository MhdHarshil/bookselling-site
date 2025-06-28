const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
// Set view engine
app.set('view engine', 'ejs'); 
// Set views directory
app.set('views', path.join(__dirname, 'views'));

// Set static files directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up body parser to handle form submissions
app.use(bodyParser.json()); 
// Set up body parser to handle URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Set up the path to the front-end directory
app.use(express.static(path.join(__dirname, '..', 'front-end')));

// Set up the path to the front-end pages
app.use('/pages', express.static(path.join(__dirname, '..', 'front-end', 'pages')));

// Set up the path to the front-end assets
app.use('/assets', express.static(path.join(__dirname, '..', 'front-end', ' assets')));

// Set up the path to the front-end styles    
app.use('/styles', express.static(path.join(__dirname, '..', 'front-end', 'styles')));


// Set up the path to the front-end scripts
app.use('/scripts', express.static(path.join(__dirname, '..', 'front-end', 'scripts')));

// Set up the path to the front-end images
app.use('/images', express.static(path.join(__dirname, '..', 'front-end', 'images')));

// Set up the path to the front-end fonts
app.use('/fonts', express.static(path.join(__dirname, '..', 'front-end', 'fonts')));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'front-end')));

// Middleware to handle JSON requests
app.use(express.json());
// Middleware to handle URL-encoded requests
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
}
);

// Middleware to parse cookies
const cookieParser = require('cookie-parser');

app.use(cookieParser());

// Middleware to handle 404 errors
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});



// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Mongoose Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'..', 'front-end','pages', 'login-page.html'));
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (user) {
      res.send('<h1>✅ Login Successful!</h1>');
    } else {
      res.send('<h1>❌ Login Failed. Invalid credentials.</h1>');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});
app.get('/payment', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'front-end', 'pages', 'payment.html'));
});
app.post('/process-payment', (req, res) => {
  const { cardNumber, expiryDate, cvv } = req.body;

  // Here you would typically process the payment with a payment gateway
  console.log('Processing payment with:', {
    cardNumber,
    expiryDate,
    cvv
  });

  // Simulate a successful payment
  res.send('<h1>✅ Payment processed successfully!</h1>');
});
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
// Serve the payment page
app.get('/payment', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'front-end', 'pages', 'payment.html'));
});
// Handle payment processing
app.post('/process-payment', (req, res) => {
  const { cardNumber, expiryDate, cvv } = req.body;
  // Here you would typically process the payment with a payment gateway
  console.log('Processing payment with:', {
    cardNumber,
    expiryDate,
    cvv
  });

  // Simulate a successful payment
  res.send('<h1>✅ Payment processed successfully!</h1>');
});
// Serve the payment page
app.get('/payment', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'front-end', 'pages', 'payment.html'));
});
// Handle payment processing
app.post('/process-payment', (req, res) => {
  const { cardNumber, expiryDate, cvv } = req.body;

  // Here you would typically process the payment with a payment gateway
  console.log('Processing payment with:', {
    cardNumber,
    expiryDate,
    cvv
  });

  // Simulate a successful payment
  res.send('<h1>✅ Payment processed successfully!</h1>');
}
);
// Serve the payment page
app.get('/payment', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'front-end', 'pages', 'payment.html'));
});
// Handle payment processing
app.post('/process-payment', (req, res) => {
  const { cardNumber, expiryDate, cvv } = req.body;

  // Here you would typically process the payment with a payment gateway
  console.log('Processing payment with:', {
    cardNumber,
    expiryDate,
    cvv
  });

  // Simulate a successful payment
  res.send('<h1>✅ Payment processed successfully!</h1>');
}
);
// Serve the payment page
app.get('/payment', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'front-end', 'pages', 'payment.html'));
});
// Handle payment processing
app.post('/process-payment', (req, res) => {
  const { cardNumber, expiryDate, cvv } = req.body;

  // Here you would typically process the payment with a payment gateway
  console.log('Processing payment with:', {
    cardNumber,
    expiryDate,
    cvv
  });

  // Simulate a successful payment
  res.send('<h1>✅ Payment processed successfully!</h1>');
}
);
// Serve the payment page
app.get('/payment', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'front-end', 'pages', 'payment.html'));
});
// Handle payment processing
app.post('/process-payment', (req, res) => {
  const { cardNumber, expiryDate, cvv } = req.body;

  // Here you would typically process the payment with a payment gateway
  console.log('Processing payment with:', {
    cardNumber,
    expiryDate,
    cvv
  });

  // Simulate a successful payment
  res.send('<h1>✅ Payment processed successfully!</h1>');
}
);
// Serve the payment page
app.get('/payment', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'front-end', 'pages', 'payment.html'));
});
// Handle payment processing
app.post('/process-payment', (req, res) => {
  const { cardNumber, expiryDate, cvv } = req.body;

  // Here you would typically process the payment with a payment gateway
  console.log('Processing payment with:', {
    cardNumber,
    expiryDate,
    cvv
  });

  // Simulate a successful payment
  res.send('<h1>✅ Payment processed successfully!</h1>');
}
);
// Serve the payment page
app.get('/payment', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'front-end', 'pages', 'payment.html'));
});
// Handle payment processing
app.post('/process-payment', (req, res) => {
  const { cardNumber, expiryDate, cvv } = req.body;

  // Here you would typically process the payment with a payment gateway
  console.log('Processing payment with:', {
    cardNumber,
    expiryDate,
    cvv
  });

  // Simulate a successful payment
  res.send('<h1>✅ Payment processed successfully!</h1>');
}
);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});