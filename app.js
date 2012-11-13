
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , colors = require('./routes/colors')
  , people = require('./routes/people')
  , trees = require('./routes/trees')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 80);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/colors', colors.colors);
app.get('/buttons', colors.buttons);
app.get('/people', people.people);
app.get('/trees', trees.trees);
app.get('/legal', people.legal);
app.get('/binpub', colors.binpub);
app.get('/gitlaw', people.gitlaw);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
