const express = require('express');
const Logger = require('./Logger');
const logger = new Logger();

const app = express();

app.get('/', (req, res) => {
  console.log('logging to graylog');
  logger.info('my graylog log');
  logger.info('my new log');
  res.send('Ok');
});

app.listen('3452');
