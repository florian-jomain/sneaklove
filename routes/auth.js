const express = require("express");
const router = new express.Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

router.get("/signup", (req, res) => {
    res.render("signup.hbs");
});

router.post("/signup", (req, res) => {
    const {
        name,
        lastName,
        email,
        password
    } = req.body;

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    if (name === "" || lastName === "" || email === "" || password === "") {
        res.render("signup.hbs", {
            msg: "Please fill all information",
        });
    }

    User.findOne({
            email: email,
        })
        .then(user => {
            console.log("I am here");

            if (user !== null) {
                res.render("signup.hbs", {
                    msg: "This email address already exists.",
                });
            } else {
                User.create({
                        name,
                        lastName,
                        email,
                        password: hashPass,
                    })
                    .then((dbResult) => {
                        console.log(dbResult);
                        res.redirect("/sneakers/collection");
                    })
                    .catch((dbErr) => {
                        console.log("This is a creation error");
                    });
            }
        })
        .catch((dbErr) => {
            console.log("This is a matching error");
        });
});

router.get("/login", (req, res) => {
    res.render("login.hbs");
});

router.post("/login", (req, res, next) => {
    const {
        email,
        password
    } = req.body;

    if (email === "" || password === "") {
        res.render("login.hbs", {
            msg: "Please enter both user name and password to log in",
        });
    }

    User.findOne({
            email: email,
        })
        .then((user) => {
            if (!user) {
                res.render("login.hbs", {
                    msg: "Invalid credentials",
                });
            }

            if (bcrypt.compareSync(password, user.password)) {
                req.session.currentUser = user;
                res.redirect('/sneakers/collection')
            } else {
                res.render("login.hbs", {
                    msg: "Invalid credentials",
                });
            }
        })
        .catch((dbErr) => {
            next(dbErr);
        });
});

router.get("/logout", (req, res) => {
    req.session.destroy((dbErr) => {
        res.redirect("/");
    });
});

module.exports = router;