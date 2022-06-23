// 
//   file name: Contact Model
//   Student name: Saim Ali
//   Student number: 301199382
//   Date : 21-06-2022  
//

const mongoose = require("mongoose");
const contact = new mongoose.Schema({
    contactname: {
        type: String,
        require: true
    },
    contactemail: {
        type: String,
        require: true
    },
    contactnumber: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("contact", contact);