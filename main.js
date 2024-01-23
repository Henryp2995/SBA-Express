const express = require('express');
const bodyParser = require('body-parser');
const products = require('./routes/products');

const app = express();
const port = 3000;

// Parsing Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

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
app.use('/api/products', products);

// Adding some HATEOAS links.
app.get('/', (req, res) => {
  res.json({
    links: [
      {
        href: '/api/products',
        rel: 'products',
        type: 'GET',
      },
      // Add more links if needed
    ],
  });
});

// 404 Middleware
app.use((req, res) => {
  res.status(404).json({ error: 'Resource Not Found' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
