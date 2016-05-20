/**** Device account class **/

define(['logger', 'jquery', 'jquery-md5', 'config'], function(logger, $, md5, config) {

	var Account = function(data) {
		
		this.type = 'device';

		this.credentials = {
			login: ExgMobile.device.uuid,
			pass: $.md5(ExgMobile.device.uuid + '!13%45v^349$0u1:345t1;34'),
			payment: config.payment,
		}
		
		this.data = data.data || {};
	}

	Account.prototype.check = function(callback) {
		var me = this;
		ExgMobile.request('/reg.pl?cmd=mobile_check', this.credentials, function(resp) {
			if (resp && resp.user) {
				me.data = resp.user;
				callback(null, true);
			} else {
				callback(null, false);
			}
		});
	}

	Account.prototype.login = function(callback) {
		ExgMobile.request('/reg.pl?cmd=mobile_enter', this.credentials, function(resp) {
			if (resp && !resp.error) {
				callback(null);
			} else {
				callback(logger.error("Cannot login by account cause error ", resp.error));
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