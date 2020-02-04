var express = require('express');
var router = express.Router();
var schedule = require('node-schedule');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Simple Schedule Service' });
});

router.get('/schedule', function (req, res, next) {
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
  
  var j = schedule.scheduleJob('*/1 * * * *', function(fireDate){
    console.log('The answer to life, the universe, and everything!', {fireDate});
  });
  return res.status(200).send({ok: true})
});

router.get('/schedule2', function (req, res, next) {
  console.log({body: req.body, query: req.query})
  let startTime = new Date(Date.now() + 5000);
  let endTime = new Date(startTime.getTime() + 5000);
  var j = schedule.scheduleJob({ end: endTime, rule: '*/1 * * * * *' }, function(fireDate){
    console.log('Time for tea!', {body: req.query, fireDate});
  });
  return res.status(200).send({ok: true, executeOn: j.nextInvocation()})
});

module.exports = router;
