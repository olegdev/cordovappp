// ************** ExGodsMobile *****************//

var ExGodsMobile = {
	
	debug: true,

	host_url: 'http://t3-oleg.karnage.ru', // 'http://timetobehero.ru', // 'http://test.exgods.ru', // 'http://t3-oleg.karnage.ru', 
	image_url: './img/',

	request: function(url, params, callback) {
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
            error: function() {
                alert(JSON.stringify(arguments));
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
			alert(msg + ' ' + JSON.stringify(data || {}));
		}
	},
}
