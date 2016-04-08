/**** Email account class **/

define(['logger'], function(logger) {

	var Account = function(data) {
		
		this.type = 'email';

		this.credentials = data.credentials || {
			login: '',
			pass: '',
			payment: ExgMobile.device.platform.toLowerCase(),
		}
		
		this.data = data.data || {};
	}

	Account.prototype.check = function(callback) {
		var me = this;
		ExgMobile.request('/reg.pl?cmd=mobile_mail_check', this.credentials, function(resp) {
			if (resp && resp.user) {
				me.data = resp.user;
				callback(null, true);
			} else {
				callback(null, false);
			}
		});
	}

	Account.prototype.login = function(callback) {
		ExgMobile.request('/reg.pl?cmd=mobile_mail_enter', this.credentials, function(resp) {
			if (resp && !resp.error) {
				callback(null);
			} else {
				callback(logger.error("Cannot login by account cause error ", resp.error));
			}
		});
	}

	Account.prototype.bind = function(account, callback) {
		var me = this;
		ExgMobile.request('/reg.pl?cmd=mobile_mail_bind', {
			login: account.credentials.login,
			pass: account.credentials.pass,
			email: me.credentials.login,
			epass: me.credentials.pass,
		}, function(resp) {
			if (resp && !resp.error) {
				me.data = account.data;
				callback(null);			
			} else {
				callback(logger.error("Cannot bind account to email", resp));
			}
		});
	}

	return Account;
});