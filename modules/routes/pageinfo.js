var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

mongoose.connect('localhost:27017/stroked');

var itemSchema = new mongoose.Schema({
  name: String,
  date: Date,
  dots: Array

});

var items = mongoose.model('items', itemSchema);

router.post('/', function(req, res) {
  console.log('in items.js, post to /, req.body is:', req.body);
  var recordToAdd = {
    name: req.body.name,
    date: req.body.date,
    dots: req.body.dots
  };
  // create new record
  var newRecord = items(recordToAdd);
  newRecord.save();
  res.send(200);
});

router.get('/', function(req, res) {
  console.log('in items.js, get to /, req.body is:', req.body);
  items.find().then(function(response) {
    res.send(response);
  });
});
router.delete('/:id', function(req, res) {
  console.log('db item delete', req.params.id);
  items.remove({
    _id: req.params.id
  }).then(function(err) {
    if (!err) {
      res.send('nudes');
    } else {
      res.send('error');
    }
  });
});

module.exports = router;
