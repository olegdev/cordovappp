/***** Game view ****/

define([
	'logger',
	'jquery',
	'config',
	'resources',
	'views/game/game.tpl'
], function(logger, $, config, resources, tpl) {

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
			var installedCssFiles = resources.getInstalledCssFiles(function(installedCssFiles) {
				// рабочий файл в конец
				installedCssFiles.sort(function(a,b) {
					if (a.indexOf('exgods2-all') != -1) {
						return 1;
					} else if (b.indexOf('exgods2-all') != -1) {
						return -1;
					} else {
						return 0;
					}
				});

				installedCssFiles.forEach(function(fileName) {
					$("head").append("<link rel='stylesheet' type='text/css' href='cdvfile://localhost/bundle/www/"+ fileName +"' />");
				});
			});
		},

		loadScripts: function() {
			var installedJsFiles = resources.getInstalledJsFiles(function(installedJsFiles) {
				// рабочий файл в конец
				installedJsFiles.sort(function(a,b) {
					if (a.indexOf('exgods2-all') != -1) {
						return 1;
					} else if (b.indexOf('exgods2-all') != -1) {
						return -1;
					} else {
						return 0;
					}
				});

				installedJsFiles.forEach(function(fileName) {
					$.getScript("cdvfile://localhost/bundle/www/" + fileName);
				});
			});
		},
	}
});