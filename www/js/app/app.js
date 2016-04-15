define([
    'logger',
    'config',
    'ui',
    'accounts',
    'translates',
    'underscore',
    'storage',
    'resources',
], function(logger, config, ui, accounts, translates, _, storage, resources) {

// App namespace
window.ExgMobile = {

	init: function(device) {

        /****/ logger.log('App init');

		this.device = device;
        resources.init(function() {
            accounts.init(function() {
                translates.init(function() {
                    // storage.setItem('initialized', true);
                    ui.openPage('index_page');
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

		callback = callback || Ext.emptyFn;
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