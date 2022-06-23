// 
//   file name: Index Router
//   Student name: Saim Ali
//   Student number: 301199382
//   Date : 21-06-2022  
//

var express = require('express');
var router = express.Router();
const loginModel=require("../model/login.model");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Home', ali: "" });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
    res.render('index', { title: 'Home', ali: "" });
});

/* GET About Us page. */
router.get('/about', function(req, res, next) {
    res.render('about', { title: 'About', ali: "" });
});

/* GET Projects page. */
router.get('/projects', function(req, res, next) {
    res.render('projects', { title: 'Projects', ali: "" });
});

/* GET Services page. */
router.get('/services', function(req, res, next) {
    res.render('services', { title: 'Services', ali: "" });
});

/* GET Contact Us page. */
router.get('/contact', function(req, res, next) {
    res.render('contact', { title: 'Contact', ali: '' });
});
/* GET Login page. */
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login', ali: '' });
});
/* Post Login page. */
router.post('/login', function(req, res, next) {
    let search={ username: req.body.username, password:  req.body.password }
    loginModel.findOne(search, function(err, login) {

        if (err) {
            console.log(err);
        } else if (!login) {
            res.render('login', { title: 'Login', ali: 'Try Again' });
        } else {
            req.session.admin = login;
            res.redirect("/admin/business-contacts");
        }
    });

});
module.exports = router;