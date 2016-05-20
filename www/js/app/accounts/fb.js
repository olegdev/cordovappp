/**** FB account class **/

define(['logger', 'config', 'errors', 'openFB'], function(logger, config, errors, openFB) {

	openFB.init({
		appId: config.fb_app_id,
		oauthRedirectURL: config.host_url + '/oauth_response.html',
		cordovaOAuthRedirectURL: config.host_url + '/oauth_response.html',
	});

	var Account = function(data) {
		
		this.type = 'fb';

		this.credentials = data.credentials || {
			type: 'fb',
			sn_id: '',
			sn_token: '',
			payment: config.payment,
		}
		
		this.data = data.data || {};
	}

	Account.prototype.auth = function(callback) {
		var me = this;

		me.getAccessToken(function(data) {
			/***/ logger.log('Access token ', data);
			openFB.api({
	            path: '/me',
	            success: function(resp) {
					me.credentials.sn_id = resp.id;
					me.credentials.sn_token = data.accessToken;
					callback();
	            },
	            error: function() {
	            	logger.error('FB api request error', arguments);
	            }
	       	});
		});
	}

	Account.prototype.getAccessToken = function(callback) {
		var me = this;

		/***/ logger.log('Request access token');

		openFB.login(
            function(response) {
                if(response.status === 'connected') {
                	callback(response.authResponse);
                } else {
                	logger.error(response.error);
                }
            },
            {scope: config.fb_app_permissions.join(',')}
        );
	}

	Account.prototype.check = function(callback) {
		var me = this;
		ExgMobile.request('/reg.pl?cmd=mobile_social_check', me.credentials, function(resp) {
			if (resp && resp.user) {
				me.data = resp.user;
				callback(null);
			} else {
				callback(errors.factory({
					type: 'auth',
					response: resp
				}));
			}
		});
	}

	Account.prototype.login = function(callback, repeated) {
		var me = this;
		ExgMobile.request('/reg.pl?cmd=mobile_social_enter', me.credentials, function(resp) {
			if (resp && !resp.error) {
				callback(null);
			} else {
				if (resp.error == 6 && !repeated) {
					me.getAccessToken(function(data) {
						if (data.userID == me.credentials.sn_id) {
							me.credentials.sn_token = data.accessToken;
							me.login(callback, true);
						} else {
							callback(errors.factory({
								type: 'text',
								text: 'Нужно залогиниться в фб нужным аккаунтом',
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
					response: resp
				}));
			}
		});
	}

	Account.prototype.isEqual = function(account) {
		return account.type == this.type && account.credentials.sn_id == this.credentials.sn_id;
	}

	return Account;
});