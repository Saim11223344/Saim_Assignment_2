// 
//   file name: Login Model
//   Student name: Saim Ali
//   Student number: 301199382
//   Date : 21-06-2022  
//
const mongoose = require("mongoose");
const login = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("login", login);