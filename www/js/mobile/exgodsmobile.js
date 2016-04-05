// ************** ExGodsMobile *****************//

var ExGodsMobile = {
	
	debug: true,

	host_url:  'http://www.timetobehero.ru/', // 'http://timetobehero.ru', // 'http://test.exgods.ru',
	image_url: 'http://s20.timetobehero.ru/',  //'./img/',

	request: function(url, params, callback) {
		var me = this;
		callback = callback || Ext.emptyFn;
		params = params || {};
		$.ajax({
            url: this.host_url + url,
            data: params,
            type: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true,
            },
            success: function(resp) {
                callback(resp);
            },            
            error: function(resp) {
            	if (resp.status == 0) {
            		me.errorHandler("You have no internet connection");	
            	} else {
            		me.errorHandler("Connection error", resp);
            	}
            }
        });
	},

	/**
	 * Сохраняет данные девайса
	 */
	setDevice: function(device) {
		var me = this;
		localStorage.setItem('device', JSON.stringify(device));
	},

	/**
	 * Возвращает данные девайса
 	 */
	getDevice: function() {
		return JSON.parse(localStorage.getItem('device'));
	},

	errorHandler: function(msg, data) {
		if (this.debug) {
			alert(msg + ' ' + (data ? JSON.stringify(data || {}) : ''));
		}
	},

	/**
	 * Load the game
	 */
	bootGame: function() {
		location.href = 'game.html';

		// var me = this,
			
		// 	css = [
		// 		'css/ext-theme-classic-all-4_2_1.css',
		// 		'css/exgods2-all.css',
		// 	],

		// 	scripts = [
		// 		"j/libs/html2canvas/html2canvas.js",
		// 		"j/libs/html2canvas/html2canvas.svg.js",
		// 		"j/libs/extjs/extjs-5.1.1/ext-all.js",
		// 		"j/libs/svg/svg.min.js",
		// 		"j/exgods2-all.min.js",
		// 	],

		// 	innerLoadCss = function() {
		// 		css.forEach(function(href) {
		// 			$('head').append("<link rel='stylesheet' type='text/css' href='"+href+"'>");
		// 		});
		// 	},

		// 	innerLoadScripts = function() {
		// 		scripts.forEach(function(src) {
		// 			$.getScript(me.host_url + src);
		// 		});
		// 	},

		// 	innerLoadConfig = function(callback) {
		// 		var interval;
		// 		$('head').append("<script type='text/javascript' src='"+ me.host_url + "main.pl?cmd=config&r=" + Math.random() +"'>");
		// 		interval = setInterval(function() {
		// 			if (window.config) {
		// 				clearInterval(interval);
		// 				callback();
		// 			}
		// 		}, 100);
		// 	};

		// window.IMAGE_URL = ExGodsMobile.image_url;
		// window.HOST_URL = ExGodsMobile.host_url;

		// $(document.body)
		// 	.attr('data-enhance', false)
		// 	.html('<div id="viewport-wrapper"></div>');

		// window.exGodsLoader = new PreloaderClass({
		// 	onReady: function() {
		// 		innerLoadConfig(function() {
		// 			innerLoadCss();
		// 			innerLoadScripts();
		// 			Overrides.run();
		// 		});
		// 	}
		// });

		// window.Ext = {};
	}
}

var Overrides = {
	targets: {
		'XMPPChat.BOSH_SERVICE': function() {
			XMPPChat.BOSH_SERVICE  = HOST_URL + 'chb/';
		},
		'ExGodsCore.AjaxRequest': function() {
			ExGodsCore.AjaxRequest.request = function(args) {
		        var me = this,
		            success = args.success,
		            failure = args.failure,
		            callback = args.callback,
		            app = this.application;

			    args.url = HOST_URL + args.url;
		        args.cors = true;
		        args.withCredentials = true;

		        delete args.success;
		        if (typeof success == 'function') {
		            success = {
		                afterKeyHandlers: success
		            };
		        }
		        args = Ext.apply({
		            success: function(response, options) {
		                var result = Ext.decode(response.responseText, true);
		                if (!result) {
		                    me.fireEvent('jsondecodeerror', response, args);
		                } else {
		                    if (success && success.beforeKeyHandlers) {
		                        success.beforeKeyHandlers.call(this, result, options);
		                    }
		                    me.invokeKeyHandlers(result);
		                    if (success && success.afterKeyHandlers) {
		                        success.afterKeyHandlers.call(this, result, options);
		                    }
		                }
		            },
		            scope: args.scope || this
		        }, args);
		        // по умолчанию запрос ставим в очередь
		        Ext.applyIf(args, {
		            queue: true
		        });
		        return Ext.Ajax.request(args);
		    }
		},
	},
	run: function() {
		var interval = setInterval(function() {
			var keys = Object.keys(Overrides.targets);
			if (keys.length) {
				keys.forEach(function(key) {
					var parts = key.split('.');
					var obj = window;
					var exists = false;
					parts.forEach(function(part, index) {
						if (typeof obj[part] != 'undefined') {
							if (index < parts.length-1) {
								obj = obj[part];
							} else {
								exists = true;
							}
						}
					});
					if (exists) {
						console.log(key, 'exists');
						Overrides.targets[key]();
						delete Overrides.targets[key];
					}
				});
			} else {
				clearInterval(interval);
			}
		}, 10);
	}
}
