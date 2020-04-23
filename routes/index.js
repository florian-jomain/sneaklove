const express = require("express");
const router = express.Router();
const hbs = require('hbs');
const Sneaker = require('../models/Sneaker');

router.get("/", (req, res) => {
  res.render("index.hbs");
});

router.get("/sneakers/:cat", (req, res) => {
  const category = req.params.cat;
  if (category === 'collection') {
    Sneaker.find()
      .then(dbResult => {
        res.render("products.hbs", {
          sneakers: dbResult,
        });
      })
      .catch(dbErr => {
        console.log(dbErr);
      });
  } else {
    Sneaker.find({
        category: [category]
      })
      .then(dbResult => {
        res.render("products.hbs", {
          sneakers: dbResult,
        });
      })
      .catch(dbErr => {
        console.log(dbErr);
      });
  }
});

router.get("/one-product/:id", (req, res) => {
  const id = req.params.id;
  Sneaker.findById(id)
    .then(dbResult => {
      res.render("one_product.hbs", {
        sneaker: dbResult,
        sizes: dbResult.sizes,
      });
    })
    .catch(dbErr => {
      console.log(dbErr);
    });
});

module.exports = router;