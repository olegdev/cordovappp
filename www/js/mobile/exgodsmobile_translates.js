//********** Класс менеджера переводов  **************//

ExGodsMobileTranslates = function() {
	this.langs = {};
}

/*** Добавить переводы для языка */
ExGodsMobileTranslates.prototype.add = function(lang, translates) {
	var me = this;
	if (!me.langs[lang]) {
		me.langs[lang] = {};
	}
	$(me.langs[lang], translates);
}

/*** Вернет перед по ключу для текущего языка */
ExGodsMobileTranslates.prototype.t = function(key) {
	
}

ExGodsMobile.translates = new ExGodsMobileTranslates();