/**** FB account class **/

define(['logger', 'config'], function(logger, config) {

	var Account = function(data) {
		
		this.type = 'fb';

		this.credentials = data.credentials || {
			sn_id: '',
			type: 'fb',
			payment: ExgMobile.device.platform.toLowerCase(),
			sn_token: '',
		}
		
		this.data = data.data || {};
	}

	Account.prototype.check = function(callback) {
		var me = this,

			innerCheckAccount = function(data) {

				/***/ logger.log('FB data received. Do check request');

				me.credentials.sn_id = data.userID;
				me.credentials.sn_token = data.accessToken;

				ExgMobile.request('/reg.pl?cmd=mobile_social_check', me.credentials, function(resp) {
					if (resp && resp.user) {
						me.data = resp.user;
						callback(null, true);
					} else {
						callback(null, false);
					}
				});
			};

		facebookConnectPlugin.logout(function() {

			/***/ logger.log('Start checking fb account. Call fb getLoginStatus');

			facebookConnectPlugin.getLoginStatus(function(response) {

				/***/ logger.log('FB login status', response);

				if (response.status == 'connected') {
					innerCheckAccount(response.authResponse);
				} else {
					
					/***/ logger.log('User is disconnected. Call fb login');

					facebookConnectPlugin.login(config.fb_permissions, function(response) {
						innerCheckAccount(response.authResponse);
					}, function(error) {
						callback(logger.error(error));
					});
				}

			});

		}, function(error) {
			/***/ logger.error("FB logout error", error);
		});
	}

	Account.prototype.login = function(callback) {
		ExgMobile.request('/reg.pl?cmd=mobile_social_enter', this.credentials, function(resp) {
			if (resp && !resp.error) {
				callback(null);
			} else {
				callback(logger.error("Cannot login by account cause error ", resp.error));
			}
		});
	}

	Account.prototype.bind = function(account, callback) {
		var me = this;

		/***/ logger.log('Start bind fb account. Call fb login');

		facebookConnectPlugin.login(config.fb_permissions, function(data) {

			/***/ logger.log('FB response', data);

			me.credentials.sn_id = data.userID;
			me.credentials.sn_token = data.accessToken;

			ExgMobile.request('/reg.pl?cmd=mobile_social_bind', {
				login: account.credentials.login,
				pass: account.credentials.pass,
				type: me.credentials.type,
				sn_id: me.credentials.sn_id,
				sn_token: me.credentials.sn_token,
			}, function(resp) {
				if (resp && !resp.error) {
					me.data = account.data;
					callback(null);
				} else {
					callback(logger.error("Cannot bind account to email", resp));
				}
			});
		}, function(error) {
			callback(logger.error(error));
		});
	}

	return Account;
});