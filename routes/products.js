// products.js

const express = require("express");
const router = express.Router();

const products = require("../data/products");
const error = require("../utilities/error");

router
  .route("/")
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
      res.json(products[products.length - 1]);
    } else {
      next(error(400, "Insufficient Data"));
    }
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const product = products.find((p) => p.id == req.params.id);
    if (product) {
      res.json({ product });
    } else {
      next();
    }
  })
  .patch((req, res, next) => {
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
      next();
    }
  })
  .delete((req, res, next) => {
    const productIndex = products.findIndex((p) => p.id == req.params.id);
    if (productIndex !== -1) {
      const deletedProduct = products.splice(productIndex, 1);
      res.json({ deletedProduct });
    } else {
      next();
    }
  });

module.exports = router;
