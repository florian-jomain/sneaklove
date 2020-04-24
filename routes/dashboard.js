const express = require("express");
const router = new express.Router();
const User = require('../models/user.js');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

router.get('/prod-add', (req, res) => {
    res.render('product_add.hbs');
});

router.get('/prod-manage', (req, res) => {
    console.log(res);
    res.render('product_manage.hbs');
});

module.exports = router;