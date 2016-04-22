requirejs.config({
    baseUrl: 'js/app',
    paths: {
		'jquery': '../vendor/jquery/dist/jquery.min',
		'jquery-md5': '../vendor/jquery-md5/jquery.md5',
		'jquery-placeholder': '../vendor/jquery-placeholder/jquery.placeholder.min',
		'jquery-validation': '../vendor/jquery-validation/dist/jquery.validate',
		'jquery-form': '../vendor/jquery-form/jquery.form',
		'underscore': '../vendor/underscore/underscore',
		'text': '../vendor/text/text',
		'json': '../vendor/requirejs-plugins/src/json',
		'js-url': '../vendor/js-url/url.min',
		'openFB': '../vendor/openfb/openfb',
		'svgjs': '../vendor/svg.js/dist/svg.min',
	},
	"shim": {
		"jquery": ["svgjs"],
        "jquery-md5": ["jquery"],
        "jquery-placeholder": ["jquery"],
        "jquery-validation": ["jquery"],
        "jquery-form": ["jquery"],
        "js-url": ["jquery"],
        "fb": ["app"],
        "openFB": {
        	exports: "openFB"
        }
    }
});

require(['config', 'app', 'views/logview/logview'], function(config, app, logview) {
	var innerDeviceReady = function() {

		app.init(device);			

		if (config.debug) {
			logview.render('#exgmobile-logview');
		}
	};

	document.addEventListener('deviceready', innerDeviceReady, false);

	// debug
	// window.device = {uuid: 3, platform: 'ios'};
	// innerDeviceReady();
});