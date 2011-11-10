
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
	, everyauth = require('everyauth')
	, util 			= require('util')
	, Promise 	= everyauth.Promise;
	
everyauth.facebook
	.myHostname('http://bogdan-mocan.herokuapp.com')
	.appId('your fb app id')
	.appSecret('your fb secret')
  .findOrCreateUser( function (session, accessToken, accessTokExtra, fbUserMetadata) {
    var user = { name: "nume"};
		
		var promise = new Promise();
		promise.fulfill(user);
		
    return promise;
  })
  .redirectPath('/');
	
everyauth.everymodule.moduleTimeout(-1); 
var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
	app.use(everyauth.middleware());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes


app.get('/', routes.index);

app.listen(process.env.PORT || 3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
