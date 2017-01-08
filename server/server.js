require('./config/config.js');

const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT;

var app = express();

//assign default website view engine path
app.use(express.static(publicPath));


app.listen(port, () => {
    console.log(`Started on port ${port}`);
});
