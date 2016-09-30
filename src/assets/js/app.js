// Begin init timer
Logger.time('init');

// Enable logger for environments matching criteria
if (Modernizr.localstorage) {
  if (localStorage.getItem('debug')) {
    Logger.useDefaults();
    config.cdnBase = '';
    Logger.info('[Logger] Enabled logging.');
  }
}

// Test the browser for required features
var modernizrTests = [
  'audio',
  'cssanimations',
  'csstransforms',
  'csstransitions',
  'video'
];

for (var i = 0; i < modernizrTests.length; i++) {
  if (!Modernizr[modernizrTests[i]]) {
    Logger.error('[Modernizr] Browser does not support required browser feature ' + modernizrTests[i] + '.');
    throw new Error('Unsupported browser.');
  } else {
    Logger.info('[Modernizr] Browser supports required browser feature ' + modernizrTests[i] + '.');
  }
}

// Prepare marked
var renderer = new marked.Renderer();
renderer.paragraph = function(t){return t};
marked.setOptions({ renderer: renderer });

// On ready function
function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}

// Get URI parameters
// From http://stackoverflow.com/a/901144
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Get the ripee from the URI hash
var ripee = window.location.hash && window.location.hash.length > 1 ? decodeURIComponent(window.location.hash.substr(1)) : null;

setInterval(function () {
  var newRipee = window.location.hash && window.location.hash.length > 1 ? decodeURIComponent(window.location.hash.substr(1)) : null;

  if (newRipee !== ripee) {
    ripee = newRipee;
    reset();
  }
}, 5);

// Configure things
if (getParameterByName('light') !== null) {
  document.body.className += ' light-theme';
}
if (getParameterByName('tombstone') !== null) {
  document.body.className += ' tombstone';
}

// Hide disabled features on the DOM
if (!config.audio || getParameterByName('noaudio') !== null) {
  document.getElementById('audio-info').style.display = 'none';
  Logger.info('[Config] Disabled audio.');
}

/**
 * Format text using markdown and replace Twitter mentions with links.
 * @param {string} input
 * @return {string} Formatted HTML text.
 */
function format (input) {
  return marked(input.replace(/@([a-z\d_]+)/ig, '<a href="http://twitter.com/$1" title="$1\'s Twitter">@$1</a>'));
}

// Setup text in the DOM
function reset () {
  var quote = config.quotes[Math.floor(Math.random() * config.quotes.length)];

  if (ripee) {
    var quote = config.namedQuotes[Math.floor(Math.random() * config.namedQuotes.length)];
  }

  document.getElementById('quote-content').innerHTML = marked(quote[0].replace(/\{\{name\}\}/gi, ripee));
  document.getElementById('quote-source').innerHTML = format(quote[1]);
  document.getElementById('quote-contrib').innerHTML = format(quote[2]);
}

reset();

// Set the browser type to "supported"
document.documentElement.className = document.documentElement.className.replace(/(?:^|\s)unsupported-browser(?!\S)/g , '');
document.documentElement.className += ' supported-browser';
Logger.info('[Modernizr] Set the browser status to supported.');
