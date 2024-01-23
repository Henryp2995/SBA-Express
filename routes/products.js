const express = require('express');
const router = express.Router();
const productsData = require('../data/products');
const error = require('../utilities/error');

// Initialize with the provided static data
let products = [...productsData];

router
  .route('/products') // Use /products for the main list
  .get((req, res) => {
    res.render('index', { products });
  })
  .post((req, res, next) => {
    if (req.body.product && req.body.description && req.body.price) {
      const product = {
        id: products.length + 1,
        product: req.body.product,
        description: req.body.description,
        price: req.body.price,
      };

      products.push(product);
      res.json({ product });
    } else {
      next(error(400, 'Insufficient Data'));
    }
  });

router
  .route('/products/:id') // Use /products/:id for individual products
  .get((req, res, next) => {
    const productId = parseInt(req.params.id);
    const product = products.find((p) => p.id === productId);

    if (product) {
      // Render the individual product data directly on the homepage
      res.render('index', { products: [product] });
    } else {
      next(error(404, 'Product Not Found'));
    }
  })
  .patch((req, res, next) => {
    // Your existing code for updating a product
  })
  .delete((req, res, next) => {
    // Your existing code for deleting a product
  });

module.exports = router;
