define(['config', 'storage'], function(config, storage) {

	var Translates = {

		lang: undefined,

		translates: {},

		init: function(callback) {
			var me = this;
			this.lang = storage.getItem('lang');
			if (!this.lang) {
				if (navigator.globalization) {
					this.lang = navigator.globalization.getPreferredLanguage();	
				}
				if (!this.lang || !this.isSupports(this.lang)) {
					this.lang = config.defaultLang;
				}
			}
			this.loadTranslates(callback);
		},

		setLang: function(lang, callback) {
			this.lang = lang;
			storage.setItem('lang', this.lang);
			this.loadTranslates(callback);
		},

		loadTranslates: function(callback) {
			var me = this;
			require(['translates/' + this.lang], function(translates) {
				me.translates = translates;
				if (callback) {
					callback();
				}
			});
		},

		t: function(key) {
			return this.translates[key];
		},

	};

	return Translates;

});