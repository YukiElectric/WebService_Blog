const express = require('express');
const config = require('config');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.urlencoded({extended : true, limit : '10mb'}));
app.use(express.json({limit : '10mb'}));
app.use(config.get("app.prefixApiVersion"),require(`${__dirname}/../routers/web`));

module.exports = app;