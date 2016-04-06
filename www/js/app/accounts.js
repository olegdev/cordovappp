define(['jquery', 'jquery-md5', 'app', 'storage'], function($, md5, app, storage) {

	var Accounts = function() {
		this.list = this.getFromStorage();
	}

	// вернёт данные device-аккаунта для этого устройства
	Accounts.prototype.getDeviceAccountCredentials = function(type, data) {
		var salt = '!13%45v^349$0u1:345t1;34';
		return {
			login: app.device.uuid,
			pass: $.md5(app.device.uuid + salt),
		}
	}

	// запрашивает у сервера аккаунт, привязанный к этому устройству
	Accounts.prototype.check = function(type, credentials, callback) {
		var me = this,
			cmd;
		if (type == 'device') {
			cmd = '/reg.pl?cmd=mobile_check';
		} else if (type == 'email') {
			cmd = '/reg.pl?cmd=mobile_mail_check';
		}
		app.request(cmd, credentials, function(resp) {
			if (resp && resp.user) {
				callback(me.add(type, credentials, resp.user));
			} else {
				callback();
			}
		});
	}

	// добавляет аккаунт в список
	Accounts.prototype.add = function(type, credentials, data) {
		var account = {
			type: type,
			credentials: credentials,
			data: data
		};
		if (type == 'device') {
			// удаляю предыдущий device-аккаунт
			for(var i = 0; i < this.list.length; i++) {
				if (this.list[i].type == 'device') {
					this.list.splice(i, 1);
					break;
				}
			}
		}
		this.list.push(account);
		this.saveInStorage();
		return account;
	}

	// выдать аккаунт по типу
	Accounts.prototype.get = function(type) {
		for(var i = 0; i < this.list.length; i++) {
			if (this.list[i].type == type) {
				return this.list[i];
			}
		}
	}

	Accounts.prototype.bind = function(target, bindType, newCredentials, callback) {
		var me = this;

		callback = callback || function() {};

		if (bindType == 'email') {
			app.request('/reg.pl?cmd=mobile_mail_bind', {
				login: target.credentials.login,
				pass: target.credentials.pass,
				email: newCredentials.email,
				epass: newCredentials.epass,
			}, function(resp) {
				if (resp && !resp.error) {
					target.type = bindType;
					target.credentials = newCredentials;
					me.saveInStorage();
					callback();						
				} else {
					app.errorHandler("Cannot bind account to email", resp);
				}
			});
		}
	}

	// залогинется аккаунтом account
	Accounts.prototype.loginBy = function(account, callback) {
		var me = this;
		if (account.type == 'device') {
			app.request('/reg.pl?cmd=mobile_enter', {
				login: account.credentials.login,
				pass: account.credentials.pass,
				payment: app.device.platform.toLowerCase(),
			}, function(resp) {
				if (resp && !resp.error) {
					callback();
				} else {
					app.errorHandler("Cannot login by account cause error ", resp.error);
				}
			});
		} else if (account.type == 'email') {
			app.request('/reg.pl?cmd=mobile_mail_enter', {
				login: account.credentials.login,
				pass: account.credentials.pass,
				payment: app.device.platform.toLowerCase(),
			}, function(resp) {
				if (resp && !resp.error) {
					callback();
				} else {
					app.errorHandler("Cannot login by account cause error ", resp.error);
				}
			});
		}
	}

	// сохраняет список в localStorage
	Accounts.prototype.saveInStorage = function() {
		storage.setItem('accounts', this.list);
	}

	// достает список из localStorage
	Accounts.prototype.getFromStorage = function() {
		return storage.getItem('accounts', []);
	}

	return new Accounts();
});