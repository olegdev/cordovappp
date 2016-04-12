/**** OK account class **/

define(['logger',
	'config',
	'underscore',
	'errors',
	'jquery',
	'jquery-md5'
], function(logger, config, _, errors, $, jqMd5) {

	var Account = function(data) {
		
		this.type = 'ok';

		this.credentials = data.credentials || {
			type: 'ok',
			sn_id: '',
			sn_token: '',
			payment: ExgMobile.device.platform.toLowerCase(),
		}
		
		this.data = data.data || {};
	}

	Account.prototype.getAccessToken = function(callback) {
		var me = this,

			authorizeUrl =  "https://connect.ok.ru/oauth/authorize?client_id=" + config.ok_app_id + 
							"&scope=" + config.ok_app_permissions.join(';') +
							"&response_type=token"+
							"&redirect_uri=http://api.ok.ru/blank.html"+
							"&layout=w",

			browserRef;

		logger.log(authorizeUrl);

		/***/ logger.log('Access token Request');

    	browserRef = window.open(authorizeUrl, '_blank', 'location=no,clearcache=no');

		browserRef.addEventListener('loadstart', function(e) {
			if ($.url('protocol', e.url) == 'http' && /blank\.html/.test(e.url)) {
				var hash = $.url('hash', e.url);
				var parts = hash.split('&');
				var data = {},
					p;
				for(var i = 0; i < parts.length; i++) {
					p = parts[i].split('=');
					data[p[0]] = p[1];
				}

				/***/ logger.log('Access token Request response', data);

				if (!data.error) {
					me.apiRequest('users.getCurrentUser', data ,function(resp) {
						data.user = resp;
						callback(data);	
					});
				}

				browserRef.close();
			}
		});
	}

	Account.prototype.apiRequest = function(method, authInfo, callback) {
		var me = this;

		/***/ logger.log('API Request', method);

		$.ajax({
			url: "http://api.odnoklassniki.ru/fb.do?"+
				 "application_key="+ config.ok_app_pkey +
				 "&method="+ method +
				 '&session_key=1' +
				 '&access_token=' + authInfo.access_token +
				 '&sig=' + $.md5('application_key='+ config.ok_app_pkey +
				 				 'method='+method+
				 				 'session_key=1' +
				 				 authInfo.session_secret_key),
			dataType: 'json',
			success: function(resp) {
				/***/ logger.log('API Request response', resp);
				callback(resp);
			},
			error: function(error) {
				logger.error(error);
			}			 
		})
	}

	Account.prototype.auth = function(callback) {
		var me = this;
		me.getAccessToken(function(data) {
			/***/ logger.log('Auth data', data);
			me.credentials.sn_id = data.user.uid;
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
						if (data.userId == me.credentials.sn_id) {
							me.credentials.sn_token = data.accessToken;
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