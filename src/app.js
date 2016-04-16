// Require dependencies.
var fs = require('fs'),
    path = require('path');

var debug = require('debug')('ripme.xyz'),
    express = require('express'),
    Mustache = require('mustache');

/*
 * Set the application environment.
 *
 * The environment is decided based on the processes NODE_ENV environment
 * variable. If this variable contains a falsey value, this defaults to
 * production.
 */
var env = process.env.NODE_ENV || 'production';
env = env === 'development' || env === 'production' ? env : 'production';
debug("Environment set to '" + env + "'.");

/*
 * Require the application ripuration.
 */
var rip = require('./rip.json')

/*
 * Initialize Express and bind it to the app variable.
 */
var app = express();

/*
 * Disable the X-Powered-By header that is automatically sent by Express.
 *
 * Makes server exploitation harder as exploiters don't know that this server
 * uses Express and Node.js.
 */
app.disable('x-powered-by');

/*
 * Setup template engine.
 */
var hbs = require('express-handlebars').create({
  layoutsDir: 'views/layouts/',
  partialsDir: 'views/partials/',
  defaultLayout: 'main'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

/*
 * Use the static directory for page assets (CSS, Javascript, Images).
 */
app.use('/assets', express.static('public', {
  dotfiles: 'deny',
  etag: true,
  index: false,
  lastModified: true,
  maxAge: 604800000,
  redirect: true
}));

/*
 * Start Express server.
 */
var server = app.listen(3000, function () {
  debug('App listening on port ' + server.address().port + '.');
});

/*
 * Route: GET /
 */
app.get('/', function (req, res) {
  var audioFiles = fs.readdirSync(path.join(__dirname, 'public', 'audio'));

  res.render('rip', {
    pageTitle: rip.templates.pageTitles[Math.floor(Math.random() * rip.templates.pageTitles.length)],
    ripText: Mustache.render(rip.templates.emptyRipeeContent[Math.floor(Math.random() * rip.templates.emptyRipeeContent.length)]),

    audio: (req.query.hasOwnProperty('noaudio') ? false : (audioFiles.length > 0 ? '/assets/audio/' + audioFiles[Math.floor(Math.random() * audioFiles.length)] : false)),
    Config: rip.config
  });
});

/*
 * Route: GET /:ripee
 */
app.get('/:ripee', function (req, res) {
  var audioFiles = fs.readdirSync(path.join(__dirname, 'public', 'audio'));

  res.render('rip', {
    pageTitle: rip.templates.pageTitles[Math.floor(Math.random() * rip.templates.pageTitles.length)],
    ripText: Mustache.render(rip.templates.withRipeeContent[Math.floor(Math.random() * rip.templates.withRipeeContent.length)], {ripee: req.params.ripee}),

    audio: (req.query.hasOwnProperty('noaudio') ? false : (audioFiles.length > 0 ? '/assets/audio/' + audioFiles[Math.floor(Math.random() * audioFiles.length)] : false)),
    Config: rip.config
  });
});

/*
 * Send 404 errors to the client.
 */
app.use(function (req, res) {
  if (!res.headersSent) {
    res.status(404).render('error', {
      title: '404',
      message: 'The requested page was not found on our server.',
      bottomText: 'If you think this is a mistake, try refreshing the page.'
    });
  }
});

/*
 * Handle 500 errors.
 */
app.use(function (err, req, res, next) {
  debug('500 Response sent to client from "' + req.path + '". Error:\n' + err);

  if (!res.headersSent) {
    res.status(500).render('error', {
      title: '500',
      message: 'An internal server error occurred.',
      bottomText: 'If you think this is a mistake, try refreshing the page.'
    });
  }

  next();
});

/*
 * Export server for unit testing.
 */
module.exports = server;
