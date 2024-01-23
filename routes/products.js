const express = require('express');
const router = express.Router();

const productsData = require('../data/products');
const error = require('../utilities/error');

// Initialize with the provided static data
let products = [...productsData];

router
  .route('/')  // Use / for the main list
  .get((req, res) => {
    res.json({ products });
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
  .route('/:id')  // Use /:id for individual products
  .get((req, res, next) => {
    const productId = parseInt(req.params.id);
    const product = products.find((p) => p.id === productId);

    if (product) {
      res.json({ product });
    } else {
      next(error(404, 'Product Not Found'));
    }
  })
  .patch((req, res, next) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex !== -1) {
      // Update the product using req.body
      for (const key in req.body) {
        products[productIndex][key] = req.body[key];
      }
      res.json({ product: products[productIndex] });
    } else {
      next(error(404, 'Product Not Found'));
    }
  })
  .delete((req, res, next) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex !== -1) {
      // Remove the product from the array
      const deletedProduct = products.splice(productIndex, 1);
      res.json({ deletedProduct });
    } else {
      next(error(404, 'Product Not Found'));
    }
  });

module.exports = router;
