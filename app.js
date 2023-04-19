const express = require("express");
const bodtParser = require("body-parser");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const {connection, newUser} = require("./database");


const app = express();

// setting up the body parser middleware and the template engine==================================================
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


// "/" route============================================================================================================
app.get("/", (req, res) => {
    res.render("signup");
})

app.post("/", async (req, res) => {
    const user1 = new newUser({
        email: req.body.email,
        password: req.body.pass,
        admin: req.body.admin
    })
    await user1.save()
    .then((user) => {
        console.log(user);
        res.redirect("/signin");
    })

})

// "/admin" and "/user" route======================================================================================

app.get("/admin", (req, res) => {
    res.render("admin");
})
app.get("/user", (req, res) => {
    res.render("user");
})

// "/signin" route==============================================================================================
app.get("/signin", (req, res) => {
    res.render("signin")
})

app.post("/signin", (req, res) => {
    const userEmail = req.body.signinEmail;
    const userPass = req.body.signinPass;

    newUser.findOne({email:userEmail})
    .then((foundUser) => {
        if(foundUser.password == userPass){
            if(foundUser.admin == "option1"){
                res.redirect("/admin");
            }
            if(foundUser.admin == "option2") {
                res.redirect("/user");
            }
        }
    })
    .catch((err) => {
        console.log(err);
    })

    
})



app.listen(3000, (req, res) => {
    console.log("server live");
})

