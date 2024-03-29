// products.js

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
    // Check if the required data is present in the request body
    if (req.body.product && req.body.description && req.body.price) {
      // Create a new product object
      const product = {
        id: products.length + 1,
        product: req.body.product,
        description: req.body.description,
        price: req.body.price,
      };

      // Add the new product to the array
      products.push(product);
      // Respond with the added product
      res.json({ product });
    } else {
      // If data is insufficient, pass an error to the next middleware
      next(error(400, 'Insufficient Data'));
    }
  });

router
  .route('/products/:id') // Use /products/:id for individual products
  .get((req, res, next) => {
    // Parse the product ID from the URL parameters
    const productId = parseInt(req.params.id);
    // Find the product with the corresponding ID
    const product = products.find((p) => p.id === productId);

    if (product) {
      // Render the individual product page
      res.render('product', { product });
    } else {
      // If the product is not found, pass a 404 error to the next middleware
      next(error(404, 'Product Not Found'));
    }
  })
  .post((req, res, next) => {
    // Parse the product ID from the URL parameters
    const productId = parseInt(req.params.id);
    // Find the index of the product in the array
    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex !== -1) {
      // Update the product using the data from the request body
      products[productIndex].product = req.body.product;
      products[productIndex].description = req.body.description;
      products[productIndex].price = req.body.price;

      // Respond with the updated product
      res.redirect(`/products/${productId}`);
    } else {
      // If the product is not found, pass a 404 error to the next middleware
      next(error(404, 'Product Not Found'));
    }
  })
  .post((req, res, next) => {
    // Parse the product ID from the URL parameters
    const productId = parseInt(req.params.id);
    // Find the index of the product in the array
    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex !== -1) {
      // Remove the product from the array
      products.splice(productIndex, 1);
      // Respond with a confirmation or redirect to the main products page
      res.redirect('/products');
    } else {
      // If the product is not found, pass a 404 error to the next middleware
      next(error(404, 'Product Not Found'));
    }
  });

module.exports = router;
