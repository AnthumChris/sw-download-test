var swFile = 'service-worker.js';
var $status = $('#sw-status');
var $swDisabled = $('.sw-disabled');

function swRegister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(swFile, {scope: './service-worker-scope'}).then(function(registration) {
      swEnabled();
    }).catch(function(err) {
      console.error('ServiceWorker registration failed: ', err);
      swDisabled();
    });
  } else {
    swUnsupported();
  }
}

function swUnregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
     for(var registration of registrations) {
      var url = registration.active.scriptURL;
      registration.unregister();
      swDisabled();
    } })
  } else {
    swUnsupported();
  }
}

function swEnabled() {
  $status.html('Enabled').removeClass('off').addClass('on');
  $swDisabled.hide();
  console.log('Registered  ', swFile);
}
function swDisabled() {
  $swDisabled.show();
  $status.html('Disabled').removeClass('on').addClass('off');
  console.log('Unregistered', url);
}
function swUnsupported() {
  $status.html('not supported').removeClass('on').addClass('off');
}

// register service worker on page load
swRegister();

// explicitly add http/https to download links based on browsers hostname (allows portability)
$('a.download').each(function() {
  var href = this.rel + '://' + window.location.host + window.location.pathname + this.getAttribute('href');
  this.setAttribute('href', href);
})

