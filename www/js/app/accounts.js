define([
	'logger',
	'underscore',
	'storage',
	'accounts/device',
	'accounts/email',
	'accounts/fb',
	'accounts/vk',
	'accounts/ok',
	'accounts/mm',
], function(logger, _, storage, DeviceAccount, EmailAccount, FBAccount, VKAccount, OKAccount, MMAccount) {

	var Accounts = function() {
		this.list = [];
	}

	Accounts.prototype.init = function(callback) {
		var me = this,
			account;

		/****/ logger.log('Account init');

		me.list = storage.getItem('accounts', []);
		if (!me.list.length) {
			account = me.factory('device');
			account.check(function(err, check) {
				if (!err) {
					if (check) {
						me.add(account);
						callback();
					} else {
						callback();
					}
				} else {
					/***/ logger.error('Error while checking device account ' + err);
				}
			});
		} else {
			me.list = _.map(me.list, function(data) {
				return me.factory(data.type, data);
			});
			callback();
		}
	}

	Accounts.prototype.factory = function(type, data) {
		var me = this;

		data = data || {};

		if (type == 'device') {
			return new DeviceAccount(data);
		} else if (type == 'email') {
			return new EmailAccount(data);
		} else if (type == 'fb') {
			return new FBAccount(data);
		} else if (type == 'vk') {
			return new VKAccount(data);
		} else if (type == 'ok') {
			return new OKAccount(data);
		} else if (type == 'mm') {
			return new MMAccount(data);
		} else {
			/****/ logger.error('Cannot create account', type, data);
		}
	}

	// добавляет аккаунт в список
	Accounts.prototype.add = function(account) {
		this.list.push(account);
		storage.setItem('accounts', this.list);
	}

	// удаляет аккаунт из спискa
	Accounts.prototype.remove = function(account) {
		var index = this.list.indexOf(account);
		if (index != -1) {
			this.list.splice(index,1);
			storage.setItem('accounts', this.list);
		}
	}

	// замена аккаунта
	Accounts.prototype.replace = function(account1, account2) {
		var index = this.list.indexOf(account1);
		if (index != -1) {
			this.list[index] = account2;
			storage.setItem('accounts', this.list);
		}
	}

	// выдать аккаунт по типу
	Accounts.prototype.get = function(type) {
		for(var i = 0; i < this.list.length; i++) {
			if (this.list[i].type == type) {
				return this.list[i];
			}
		}
	}

	// проверяет, есть ли подобный аккаунт в списке 
	Accounts.prototype.has = function(account) {
		for(var i = 0; i < this.list.length; i++) {
			if (this.list[i].isEqual(account)) {
				return true;
			}
		}
	}

	return new Accounts();
});