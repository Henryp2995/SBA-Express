const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');  // Import method-override
const productsRouter = require('./routes/products');
const productsData = require('./data/products');
const products = [...productsData];

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Set up method-override middleware
app.use(methodOverride('_method'));

// Logging Middleware
app.use((req, res, next) => {
  const time = new Date();
  console.log(`-----\n${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`);
  if (Object.keys(req.body).length > 0) {
    console.log('Containing the data:');
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

// Use the Products route
app.use('/products', productsRouter);

// Rendering HTML using EJS for the main page
app.get('/', (req, res) => {
  res.render('index', { products });
});

// Rendering HTML using EJS for individual product pages
app.get('/products/:id', (req, res, next) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (product) {
    res.render('product', { product });
  } else {
    res.status(404).json({ error: 'Product Not Found' });
  }
});

// 404 Middleware
app.use((req, res) => {
  res.status(404).json({ error: 'Resource Not Found' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
