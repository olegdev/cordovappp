/**** Email account class **/

define(['logger', 'errors', 'config'], function(logger, errors, config) {

	var Account = function(data) {
		
		this.type = 'email';

		this.credentials = data.credentials || {
			login: '',
			pass: '',
			payment: config.payment,
		}
		
		this.data = data.data || {};
	}

	Account.prototype.check = function(callback) {
		var me = this;
		ExgMobile.request('/reg.pl?cmd=mobile_mail_check', this.credentials, function(resp) {
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

	Account.prototype.login = function(callback) {
		ExgMobile.request('/reg.pl?cmd=mobile_mail_enter', this.credentials, function(resp) {
			if (resp && !resp.error) {
				callback(null);
			} else {
				callback(errors.factory({
					type: 'auth',
					response: resp,
				}));
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
				callback(errors.factory({
					type: 'auth',
					response: resp,
				}));
			}
		});
	}

	Account.prototype.isEqual = function(account) {
		return  account.type == this.type &&
				account.credentials.login == this.credentials.login &&
				account.credentials.pass == this.credentials.pass;
	}

	return Account;
});