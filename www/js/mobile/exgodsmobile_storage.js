//********** Класс хранилища данных  **************//

ExGodsMobileStorage = function() {
	this.langs = {};
}

ExGodsMobileStorage.prototype.setItem = function(key, value) {
	window.localStorage.setItem(key, JSON.stringify(value));
}

ExGodsMobileStorage.prototype.getItem = function(key, defaults) {
	var value = window.localStorage.getItem(key);
	return value ? JSON.parse(value) : defaults;
}

ExGodsMobile.storage = new ExGodsMobileStorage();