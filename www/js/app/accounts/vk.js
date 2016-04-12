/**** VK account class **/

define(['logger', 'config', 'underscore', 'errors'], function(logger, config, _, errors) {

	if (typeof VkSdk != 'undefined') {
		VkSdk.init(config.vk_app_id);
	}

	var newAccessTokenCallback = null;
	document.addEventListener('vkSdk.newToken', function(e) {
		if (newAccessTokenCallback) {
			newAccessTokenCallback(e.detail);
		}
	});

	var Account = function(data) {
		
		this.type = 'vk';

		this.credentials = data.credentials || {
			type: 'vk',
			sn_id: '',
			sn_token: '',
			payment: ExgMobile.device.platform.toLowerCase(),
		}
		
		this.data = data.data || {};
	}

	Account.prototype.getAccessToken = function(callback) {
		var me = this;

		/***/ logger.log('Request VK account data. Call logout/login');

		VkSdk.logout(function() {
        	VkSdk.initiateLogin(config.vk_app_permissions);
        }, function(err) {
        	logger.error(err);
        });

		newAccessTokenCallback = callback;
	}

	Account.prototype.auth = function(callback) {
		var me = this;
		me.getAccessToken(function(data) {
			me.credentials.sn_id = data.userId;
			me.credentials.sn_token = data.accessToken;
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