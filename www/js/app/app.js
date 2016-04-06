define(['config', 'pages'], function(config, pages) {

return {

	init: function(device) {
		this.device = device;
		pages.openPage('index_page');
	},

	request: function(url, params, callback) {
		var me = this;
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

	errorHandler: function(msg, data) {
		if (config.debug) {
			alert(msg + ' ' + (data ? JSON.stringify(data || {}) : ''));
		}
	},
}

});