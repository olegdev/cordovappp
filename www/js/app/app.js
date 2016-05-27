define([
    'logger',
    'config',
    'ui',
    'accounts',
    'translates',
    'underscore',
    'storage',
    'resources',
    'notifications',
    'apprate',
], function(logger, config, ui, accounts, translates, _, storage, resources, notifications, apprate) {

// App namespace
window.ExgMobile = {

    config: config,

    ui: ui,

	init: function(device) {

        /****/ logger.log('App init');

		this.device = device;
        resources.init(function() {
            accounts.init(function() {
                translates.init(function() {
                    notifications.init();
                    apprate.init();
                    ui.openPage('index');
                });
            }); 
        });
	},

	request: function(url, params, callback) {
		var me = this,

            urlAsString = function(url, params) {
                var str = config.host_url + url;
                _.each(params, function(key, value) {
                    str += '&' + value + '=' + key;
                });
                return str;
            };

        /***/ logger.log('Request: ' + urlAsString(url, params));

		callback = callback || function() {};
		params = params || {};
		$.ajax({
            url: config.host_url + url,
            data: params,
            type: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true,
            },
            success: function(resp) {

                /***/ logger.log('Response ' + url, resp);
                
                callback(resp);
            },            
            error: function(resp) {
               /***/ logger.error("Connection error", resp);
            }
        });
	},
}

return window.ExgMobile;

});