/***** Lang selector view ****/

define(['jquery', 'translates', 'views/lang_select/lang_select.tpl'], function($, translates, tpl) {

	return {

		render: function(renderTo) {
			var el;
			$(renderTo).html(tpl.apply());
			el = $(renderTo).find('.exgmobile-lang-select');

			/****** Dom listeners *****/

			el.on('change', function() {
				translates.setLang(el.val(), function() {
					ExgMobile.ui.reloadPage();
				});
			});
		}
	}

});