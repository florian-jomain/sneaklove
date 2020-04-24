const express = require("express");
const router = express.Router();
const hbs = require('hbs');
const Sneaker = require('../models/Sneaker');
const Tag = require('../models/Tag');

router.get("/", (req, res) => {
  res.render("index.hbs");
});

router.get("/sneakers/:cat", (req, res) => {
  const category = req.params.cat;
  if (category === 'collection') {
    Sneaker.find()
      .then(sneakers => {
        Tag.find()
          .then(tags => {
            console.log(tags)
            res.render("products.hbs", {
              sneakers: sneakers,
              tags: tags,
            })
          })
          .catch(dbErr => {
            console.log(dbErr);
          })
          .catch(dbErr => {
            console.log(dbErr);
          });
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