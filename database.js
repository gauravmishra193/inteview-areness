

// This file contains the installation and connection of the mongodb


const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb+srv://gauravmishra193:Gaurav%4018@twitterclonecluster.p3zppms.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    console.log("database connection successful");
})
.catch((err) => {
    console.log("ERROR!!!!!!");
    console.log(err);
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    admin: String
})

const newUser = mongoose.model("newUser", userSchema);

module.exports = {connection, newUser};