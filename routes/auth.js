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
            errorMessage: "Please fill in all information.",
        });
    } else {
        User.findOne({
                email: email,
            })
            .then(user => {
                if (user !== null) {
                    res.render("signup.hbs", {
                        errorMessage: "This user already exists.",
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
    }
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
            errorMessage: "Please enter user name and password to log in",
        });
    } else {
        User.findOne({
                email: email,
            })
            .then(user => {
                if (bcrypt.compareSync(password, user.password)) {
                    req.session.currentUser = user;
                    res.redirect('/sneakers/collection')
                } else {
                    res.render("login.hbs", {
                        errorMessage: "Invalid credentials",
                    });
                }
            })
            .catch((dbErr) => {
                res.render("login.hbs", {
                    errorMessage: "Invalid credentials",
                });
            });
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy((dbErr) => {
        res.redirect("/");
    });
});

module.exports = router;