const express = require("express");
const router = new express.Router();
const User = require('../models/user.js');
const Sneaker = require('../models/Sneaker.js');
const uploadCloud = require('../config/cloudinary.js');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

router.get('/prod-add', (req, res) => {
    res.render('product_add.hbs');
});

router.post('/prod-add', uploadCloud.single('image'), (req, res) => {
    const {
        name,
        ref,
        sizes,
        description,
        price,
        category
    } = req.body;

    if (req.file) {
        const image = req.file.secure_url;

        if (name === "" || ref === "" || sizes === "" || description === "" || price === "" || category === "") {
            res.render('product_add.hbs', {
                errorMessage: 'Please fill all information.'
            });
        } else {
            const newSneaker = {
                name,
                ref,
                sizes,
                description,
                price,
                category,
                image
            };

            Sneaker.create(newSneaker)
                .then(dbResult => {
                    console.log(newSneaker);
                    res.redirect('/sneakers/collection');
                })
                .catch(dbErr => {
                    console.log(dbErr);
                })
        }
    } else {
        res.render('product_add.hbs', {
            errorMessage: 'Please fill all information.'
        });
    }
});

router.get('/prod-manage', (req, res) => {
    Sneaker.find()
        .then(sneaker => {
            res.render('product_manage.hbs', {
                sneakers: sneaker,
            });
        })
        .catch(dbErr => {
            console.log(dbErr);
        })
});

router.get('/prod-delete/:id', (req, res) => {
    const id = req.params.id;
    Sneaker.findByIdAndDelete(id)
        .then(dbResult => {
            res.redirect('/prod-manage');
        })
        .catch(dbErr => {
            console.log(dbErr);
        })
})

module.exports = router;