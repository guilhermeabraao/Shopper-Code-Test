const express = require('express');
const multer = require('multer');
const { ValidateProducts, UpdatePrices } = require('./controller/products');
const routes = express();
const upload = multer();

routes.post('/validate', upload.single('products'), ValidateProducts)
routes.put('/update', UpdatePrices)

module.exports = routes;