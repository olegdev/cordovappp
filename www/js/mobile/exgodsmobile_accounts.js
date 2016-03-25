//********** Класс менеджера аккаунтов **************//

var ExGodsMobileAccounts = function() {
	this.list = this.getFromStorage();
}

// вернёт данные device-аккаунта для этого устройства
ExGodsMobileAccounts.prototype.getDeviceAccountCredentials = function(type, data) {
	var salt = '!13%45v^349$0u1:345t1;34';
	var device = ExGodsMobile.getDevice();
	return {
		login: device.uuid,
		pass: $.md5(device.uuid + salt),
	}
}

// запрашивает у сервера аккаунт, привязанный к этому устройству
ExGodsMobileAccounts.prototype.checkRemote = function(callback) {
	var me = this,
		deviceCredentials = me.getDeviceAccountCredentials();
	ExGodsMobile.request('/reg.pl?cmd=mobile_check', deviceCredentials, function(resp) {
		if (resp && resp.user) {
			me.add('device', deviceCredentials, resp.user);
		}
		callback();
	});
}

// добавляет аккаунт в список
ExGodsMobileAccounts.prototype.add = function(type, credentials, data) {
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
ExGodsMobileAccounts.prototype.get = function(type) {
	for(var i = 0; i < this.list.length; i++) {
		if (this.list[i].type == type) {
			return this.list[i];
		}
	}
}

ExGodsMobileAccounts.prototype.bind = function(target, bindType, newCredentials, callback) {
	var me = this;

	callback = callback || function() {};

	if (bindType == 'email') {
		ExGodsMobile.request('/reg.pl?cmd=mobile_mail_bind', {
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
				ExGodsMobile.errorHandler("Cannot bind account to email", resp);
			}
		});
	}
}

// залогинется аккаунтом account
ExGodsMobileAccounts.prototype.loginBy = function(account) {
	var me = this;
	if (account.type == 'device') {
		// ExGodsMobile.request('/reg.pl?cmd=mobile_login', account.credentials, function(resp) {
		// 	alert(resp);
		// });
	}
}

// сохраняет список в localStorage
ExGodsMobileAccounts.prototype.saveInStorage = function() {
	localStorage.setItem('accounts', JSON.stringify(this.list));
}

// достает список из localStorage
ExGodsMobileAccounts.prototype.getFromStorage = function() {
	var list = localStorage.getItem('accounts');
	if (list) {
		return JSON.parse(list);
	} else {
		return [];
	}
}

ExGodsMobile.accounts = new ExGodsMobileAccounts();