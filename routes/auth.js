const express = require("express");
const router = new express.Router();

router.get("/signup", (req, res) => {
    res.render('signup.hbs');
});

router.post("/signup", (req, res) => {

})

router.get("/login", (req, res) => {
    res.render('login.hbs');
});

module.exports = router;