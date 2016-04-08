define(['logger', 'config', 'pages', 'accounts', 'translates'], function(logger, config, pages, accounts, translates) {

// App namespace
window.ExgMobile = {

	init: function(device) {

        /****/ logger.log('App init');

		this.device = device;
        accounts.init(function() {
            translates.init(function() {
                pages.openPage('index_page');
            });
        });
	},

	request: function(url, params, callback) {
		var me = this;

        /***/ logger.log('Request ' + url, params);

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