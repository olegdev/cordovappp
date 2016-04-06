define(['config', 'storage'], function(config, storage) {

	var Translates = {

		lang: undefined,

		translates: {},

		init: function(callback) {
			var me = this;
			this.lang = storage.getItem('lang');
			if (!this.lang) {
				if (navigator.globalization) {
					navigator.globalization.getPreferredLanguage(function(prop) {
						var lang = prop.value.substr(0,2);
						if (typeof config.langs[lang] != 'undefined') {
							me.setLang(lang, callback);
						} else {
							me.setLang(config.defaultLang, callback);
						}
					}, function() {
						me.setLang(config.defaultLang, callback);
					});
				} else {
					this.setLang(config.defaultLang, callback);
				}
			} else {
				this.loadTranslates(callback);
			}
		},

		setLang: function(lang, callback) {
			alert('set lang ' + lang);
			this.lang = lang;
			storage.setItem('lang', this.lang);
			this.loadTranslates(callback);
		},

		loadTranslates: function(callback) {
			var me = this;
			alert('load translates');
			require(['translates/' + this.lang], function(translates) {
				alert('finish loading');
				me.translates = translates;
				if (callback) {
					callback();
				}
			});
		},

		t: function(key) {
			if (!this.translates[key]) {
				this.translates[key] = key;
			}
			return this.translates[key];
		},

	};

	return Translates;

});