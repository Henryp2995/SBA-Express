const express = require('express');
const router = express.Router();

const products = require('../data/products');

router
  .route('/')
  .get((req, res) => {
    res.json({ products });
  })
  .post((req, res) => {
    if (req.body.product && req.body.description && req.body.price) {
      const product = {
        id: products.length + 1,
        product: req.body.product,
        description: req.body.description,
        price: req.body.price,
      };

      products.push(product);
      res.json(products[products.length - 1]);
    } else {
      res.status(400).json({ error: 'Insufficient Data' });
    }
  });

router
  .route('/:id')
  .get((req, res) => {
    const product = products.find((p) => p.id == req.params.id);
    if (product) {
      res.json({ product });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  })
  .patch((req, res) => {
    const product = products.find((p, i) => {
      if (p.id == req.params.id) {
        for (const key in req.body) {
          products[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  })
  .delete((req, res) => {
    const productIndex = products.findIndex((p) => p.id == req.params.id);
    if (productIndex !== -1) {
      const deletedProduct = products.splice(productIndex, 1);
      res.json({ deletedProduct });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  });

module.exports = router;
