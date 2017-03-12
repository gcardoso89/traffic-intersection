var express = require( 'express' );
var path = require( 'path' );
var favicon = require( 'serve-favicon' );
var logger = require( 'morgan' );
var cookieParser = require( 'cookie-parser' );
var bodyParser = require( 'body-parser' );
var routes = require( './routes/index' );
var app = express();
var isDevEnv = app.get( 'env' ) === 'development';

// view engine setup
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'hbs' );
app.use( express.static( path.join( __dirname, 'public' ) ) );
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( cookieParser() );
if ( isDevEnv ) {
	app.use( require( 'node-compass' )( {
			mode: 'expanded',
			css: 'public/css',
			project: '',
			sass: 'compass'
		}
	) );
}
app.use( '/', routes );

// catch 404 and forward to error handler
app.use( function ( req, res, next ) {
	var err = new Error( 'Not Found' );
	err.status = 404;
	next( err );
} );

// ERROR HANDLERS
// development error handler
// will print stacktrace
if ( app.get( 'env' ) === 'development' ) {
	app.use( function ( err, req, res, next ) {
		res.status( err.status || 500 );
	} );
}

// production error handler
// no stacktrace leaked to user
app.use( function ( err, req, res, next ) {
	res.status( err.status || 500 );
} );

module.exports = app;
