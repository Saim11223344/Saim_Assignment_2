// 
//   file name: Admin Router
//   Student name: Saim Ali
//   Student number: 301199382
//   Date : 21-06-2022  
//

var express = require('express');
var router = express.Router();
const contactModel = require("../model/contact.model");
router.get('/business-contacts', function(req, res, next) {
    contactModel.find({}, null, { sort: { contactname: 1 } }, function(err, businessContacts) {
        if (err) {
            console.log(err);
        } else {
            res.render('business-contacts', { title: 'Business Contacts', aliContacts: businessContacts });
        }
    });
});
//delete contact by id
router.get('/delete-contact/:id', function(req, res, next) {
    contactModel.findByIdAndDelete(req.params.id, function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/admin/business-contacts");
        }
    });
});
//edit data get
router.get('/edit-contact/:id', function(req, res, next) {
    contactModel.findById(req.params.id, function(err, businessContact) {
        if (err) {
            console.log(err);
        } else {
            res.render('edit-contact', { title: 'Edit Business Contacts', aliContact: businessContact });
        }
    });
});
//edit data post
router.post('/edit-contact', function(req, res, next) {
    let contact = { _id:req.body.id,contactname: req.body.contactname, contactemail: req.body.contactemail, contactnumber: req.body.contactnumber };
    contactModel.findByIdAndUpdate(req.body.id,contact, function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/admin/business-contacts");
        }
    });
});
module.exports = router;