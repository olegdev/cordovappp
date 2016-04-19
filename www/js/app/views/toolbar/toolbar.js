/***** Toolbar view ****/

define(['jquery', 'views/lang_select/lang_select', 'views/toolbar/toolbar.tpl'], function($, langSelectView, tpl) {

	return {

		/**
		 * @param data
		 * - title
		 * - backBtn (true/false)
		 * - langSelector (true/false)
		 */
		render: function(renderTo, data) {
			var el;
			$(renderTo).html(tpl.apply(data));
			el = $(renderTo).find('.exgmobile-toolbar');

			if (data.langSelector) {
				langSelectView.render(el);
			}

			/****** Dom listeners *****/

			el.find('button[data-action="back"]').on('click', function() {
				ExgMobile.ui.back();
			});
		}
	}

});