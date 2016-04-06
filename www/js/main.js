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
	}
});

require(['config', 'app', 'translates'], function(config, app, translates) {
	var innerDeviceReady = function() {
		translates.init(function() {
			app.init(device);
		});
	};

	document.addEventListener('deviceready', innerDeviceReady, false);

	// debug
	window.device = {uuid: 1278, platform: 'ios'};
	innerDeviceReady();
});