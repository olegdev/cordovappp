/***** Game view ****/

define([
	'jquery',
	'config',
	'views/game/game.tpl'
], function($, config, tpl) {

	return {
		render: function(renderTo) {
			var me = this;

			$(renderTo).html(tpl.apply());

			me.loadCss();
			me.loadPreloader(function() {

				window.exGodsLoader = new PreloaderClass({
					//
				});	

				window.Ext = {
					manifest: {
					    compatibility: {
					        ext: '4.2'
					    }	
					}
				};

				//

				me.loadConfig(function() {
					me.loadScripts();
				});
			});
		},

		loadPreloader: function(callback) {
			$.getScript('cdvfile://localhost/bundle/www/resources/js/preloader.js').done(callback);
		},

		loadConfig: function(callback) {
			$.getScript(config.host_url + '/main.pl?cmd=config&r='+Math.random()).done(callback);
		},

		loadCss: function() {
			var cssFiles = [
				'cdvfile://localhost/bundle/www/resources/css/preloader.css',
				'cdvfile://localhost/bundle/www/resources/css/ext-theme-classic-all-5_1_1.css',
				'cdvfile://localhost/bundle/www/resources/css/exgods2-all.css',
			];

			cssFiles.forEach(function(fileName) {
				$("head").append("<link rel='stylesheet' type='text/css' href='"+ fileName +"' />");
			});

		},

		loadScripts: function() {
			var jsFiles = [
				'cdvfile://localhost/bundle/www/resources/js/html2canvas.js',
				'cdvfile://localhost/bundle/www/resources/js/html2canvas.svg.js',
				'cdvfile://localhost/bundle/www/resources/js/ext-all.js',
				'cdvfile://localhost/bundle/www/resources/js/exgods2-all.js',
			];

			jsFiles.forEach(function(fileName) {
				$.getScript(fileName);
			});
		},
	}
});