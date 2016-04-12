/**** MM account class **/

define(['logger', 'config', 'underscore', 'errors', 'js-url'], function(logger, config, _, errors, jsUrl) {

	var Account = function(data) {
		
		this.type = 'mm';

		this.credentials = data.credentials || {
			type: 'mm',
			sn_id: '',
			sn_token: '',
			payment: ExgMobile.device.platform.toLowerCase(),
		}
		
		this.data = data.data || {};
	}

	Account.prototype.getAccessToken = function(callback) {
		var me = this,

			authorizeUrl =  "https://connect.mail.ru/oauth/authorize?"+
   							"client_id="+ config.mm_app_id + "&response_type=token&" + 
   							"redirect_uri=http%3A%2F%2Fconnect.mail.ru%2Foauth%2Fsuccess.html",

   			browserRef;

		/***/ logger.log('InApp browser - open mail.ru account authorization');

		browserRef = window.open(authorizeUrl, '_blank', 'location=no,clearcache=yes');

		browserRef.addEventListener('loadstart', function(e) {
			if ($.url('protocol', e.url) == 'http' && /success\.html/.test(e.url)) {
				var hash = $.url('hash', e.url);
				var parts = hash.split('&');
				var data = {},
					p;
				for(var i = 0; i < parts.length; i++) {
					p = parts[i].split('=');
					data[p[0]] = p[1];
				}
				callback(data);
				browserRef.close();
			}
		});
	}

	Account.prototype.auth = function(callback) {
		var me = this;
		me.getAccessToken(function(data) {
			me.credentials.sn_id = data.x_mailru_vid;
			me.credentials.sn_token = data.access_token;
			callback();
		})
	}

	Account.prototype.check = function(callback) {
		var me = this;
		ExgMobile.request('/reg.pl?cmd=mobile_social_check', this.credentials, function(resp) {
			if (resp && resp.user) {
				me.data = resp.user;
				callback(null);
			} else {
				callback(errors.factory({
					type: 'auth',
					response: resp,
				}));
			}
		});
	}

	Account.prototype.login = function(callback, repeated) {
		var me = this;
		ExgMobile.request('/reg.pl?cmd=mobile_social_enter', this.credentials, function(resp) {
			if (resp && !resp.error) {
				callback(null);
			} else {
				if (resp.error == 6 && !repeated) {
					me.getAccessToken(function(data) {
						if (data.x_mailru_vid == me.credentials.sn_id) {
							me.credentials.sn_token = data.access_token;
							me.login(callback, true);
						} else {
							callback(errors.factory({
								type: 'text',
								text: 'Нужно залогиниться в VK нужным аккаунтом',
							}));
						}
					});
				} else {
					callback(errors.factory({
						type: 'auth',
						response: resp,
					}));
				}
			}
		});
	}

	Account.prototype.bind = function(account, callback) {
		var me = this;
		ExgMobile.request('/reg.pl?cmd=mobile_social_bind', {
			login: account.credentials.login,
			pass: account.credentials.pass,
			type: me.type,
			sn_id: me.credentials.sn_id,
			sn_token: me.credentials.sn_token,
		}, function(resp) {
			if (resp && !resp.error) {
				me.data = account.data;
				callback(null);			
			} else {
				callback(errors.factory({
					type: 'auth',
					response: resp,
				}));
			}
		});
	}

	Account.prototype.isEqual = function(account) {
		return account.type == this.type && account.credentials.sn_id == this.credentials.sn_id;
	}

	return Account;
});