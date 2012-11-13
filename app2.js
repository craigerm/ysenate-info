
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

var ysenate = express();
var binpub = express();
var dualServer = express();

ysenate.configure(function(){
  ysenate.set('port', process.env.PORT || 80);
  ysenate.set('views', __dirname + '/views');
  ysenate.set('view engine', 'jade');
  ysenate.use(express.favicon(__dirname + '/public/images/favicon.ico'));
  ysenate.use(express.logger('dev'));
  ysenate.use(express.bodyParser());
  ysenate.use(express.methodOverride());
  ysenate.use(ysenate.router);
  ysenate.use(express.static(path.join(__dirname, 'public')));
});
binpub.configure(function(){
  binpub.set('port', process.env.PORT || 80);
  binpub.set('views', __dirname + '/views');
  binpub.set('view engine', 'jade');
  binpub.use(express.favicon(__dirname + '/public/images/favicon.ico'));
  binpub.use(express.logger('dev'));
  binpub.use(express.bodyParser());
  binpub.use(express.methodOverride());
  binpub.use(binpub.router);
  binpub.use(express.static(path.join(__dirname, 'public')));
});
ysenate.configure('development', function(){
  ysenate.use(express.errorHandler());
});

binpub.configure('development', function() {
  binpub.use(express.errorHandler());
});

binpub.get('/', colors.binpub);

ysenate.get('/', routes.index);
ysenate.get('/colors', colors.colors);
ysenate.get('/buttons', colors.buttons);
ysenate.get('/people', people.people);
ysenate.get('/trees', trees.trees);
ysenate.get('/legal', people.legal);


dualServer 
  .use(express.vhost('www.binpub.com', binpub))
  .use(express.vhost('binpub.com', binpub))
  .use(express.vhost('www.ysenate.org', ysenate))
  .use(express.vhost('ysenate.org', ysenate))
  .listen(3000, function(){
  console.log("dual server listening on port " + 3000);
  });


