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
router.get('/audience', function(req, res, next) {
  res.render('audience', { title: 'Audience View' });
});

module.exports = router;
