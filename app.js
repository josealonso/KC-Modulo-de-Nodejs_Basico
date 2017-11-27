require('./lib/connectMongoose');

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
const myLocaleSystem = require('./internationalization/myLocaleSystem');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'public/images')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/anuncios', express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
// app.get('/datos', require('./routes/index2'));   // JR   ponía app.use
app.use('/users', require('./routes/users'));
app.use('/apiv1/anuncios', require('./routes/apiv1/articles'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	const err = new Error();   // (errorMessage);
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	if (err.array) {
		// validation error
		const localizedMessage = myLocaleSystem.translate('Not valid');
		err.status = 422;
		const errInfo = err.array({ onlyFirstError: true })[0];
		err.message = isAPI(req)
			? { message: localizedMessage, errors: err.mapped() }
			: `${localizedMessage} - ${errInfo.param} ${errInfo.msg}`;
	}

	const localizedMessage = myLocaleSystem.translate('Not Found');
	err = new Error(localizedMessage);
	res.status(err.status || 500);

	// si es una petición al API respondo JSON...
	if (isAPI(req)) {
		res.json({ success: false, error: err.message });
		return;
	}

	// ...y si no respondo con HTML:

	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.render('error');
});

function isAPI(req) {
	return req.originalUrl.indexOf('/api') === 0;
}

module.exports = app;
