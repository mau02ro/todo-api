require('dotenv').config();
const chalk = require('chalk');
const express = require('express');
const bodyParser = require('body-parser');

const errorHandler = require('./utils/network/errorHandler');
const { api } = require('./config');

const APP = express();

APP.use(bodyParser.json());
// ROUTES

APP.use(errorHandler);

APP.listen(api.port, () => {
  // eslint-disable-next-line no-console
  console.log(`${chalk.blue('[API] -> ')}API lsitening in port:${api.port}`);
});
