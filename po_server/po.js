require('dotenv').config();
const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    routes = require('./routes/routes'),
    app = express(),
    port = process.env.PORT;

app.use(cors())
app.use(bodyParser.json());

app.use('/', routes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});