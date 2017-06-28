//requires
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var items = require('./modules/routes/pageinfo');
//uses
app.use (express.static('public'));
app.use( bodyParser.urlencoded( { extended: true } ) );

//globals
var port = process.env.PORT || 2020;

//use
app.use( express.static('public'));
app.use( '/items', items);

//listenerCount
app.listen(port, function(){
  console.log('server is up on 2020');
});

app.get('/', function(req, res){
  res.sendFile( path.resolve('public/views/index.html'));
});
