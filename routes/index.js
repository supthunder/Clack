var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/presenter', function(req, res, next) {
  res.render('presenter', { title: 'Presenter View' });
});

/*test page*/
router.get('/presentee', function(req, res, next) {
  res.render('presentee', { title: 'Presentee View' });
});

module.exports = router;
