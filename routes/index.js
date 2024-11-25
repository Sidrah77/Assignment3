var express = require('express');
var router = express.Router();

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
/* GET about us page. */
router.get('/aboutus', function(req, res, next) {
  res.render('index', { title: 'About Us' });
});
/* GET Product page. */
router.get('/product', function(req, res, next) {
  res.render('index', { title: 'Product' });
});
/* GET Services page. */
router.get('/service', function(req, res, next) {
  res.render('index', { title: 'Service' });
});
/* GET contact me page. */
router.get('/contactus', function(req, res, next) {
  res.render('index', { title: 'Contact us' });
});

module.exports = router;

const mongoose= require("mongoose");
const dbURI= 'URI:mongodb://localhost:27017/';
mongoose.connect(dbURI , { useNewUrlParser: true, useUnifiedTopology: true})
  .then (() => console.log ('Connected to MongoDB'))
  .catch((error) => console.error('Connection error', error)); 