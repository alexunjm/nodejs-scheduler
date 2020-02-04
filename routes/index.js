"use strict";

const express = require('express');
const router = express.Router();
const schedule = require('node-schedule');
const request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Simple Schedule Service' });
});

/**
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
|    |    |    |    |    |
|    |    |    |    |    └ day of week (0 - 7) (0 or 7 is Sun)
|    |    |    |    └───── month (1 - 12)
|    |    |    └────────── day of month (1 - 31)
|    |    └─────────────── hour (0 - 23)
|    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
  */
/**
 * Cada 3 segundos
 * */
//  */3 * * * * *
/**
 * Cada 5 minutos
 * */
//  */5 * * * *
/**
 * the minute is 42 (e.g. 19:42, 20:42, etc.).
 * note that only has 5 inputs
 */
// 42 * * * *
router.post('/api/schedule', function (req, res, next) {
  const timeInMilliseconds = req.body.milliseconds || 1000;

  const startTime = new Date(Date.now());
  const executionTime = new Date(startTime.getTime() + timeInMilliseconds);

  const j = schedule.scheduleJob(executionTime, function(fireDate){

    console.log('Scheduling post!', {body: req.body, fireDate});

    const options = {
      'method': req.body.method || 'POST',
      'url': req.body.url,
      'headers': {
        'Content-Type': 'application/json',
        ...req.body.headers
      },
      body: JSON.stringify(req.body.data)
    };
    console.log({options});
    request(options, function (error, response) { 
      if (error) throw new Error(error);
      console.log({postResponseBody: response.body});
    });

  });
  return res.status(200).send({
    postTo: req.body.url, 
    startTime, 
    executionTime, 
    nextInvocation: j.nextInvocation()
  })
});

/**
 * //sample request
var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://localhost:3000/api/schedule',
  'headers': {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({"url":"https://url.to/test","data":{"test":"hola"},"milliseconds":5000})

};
request(options, function (error, response) { 
  if (error) throw new Error(error);
  console.log(response.body);
});

 */

module.exports = router;
