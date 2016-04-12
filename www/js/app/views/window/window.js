/***** Window view ****/

define(['jquery', 'views/window/window.tpl'], function($, tpl) {

	return {
		/**
		 * @param config
		 *	- title
		 *	- content
		 *	- applyBtnText
		 * 	- handler
		 */
		render: function(config) {
			var el = $(tpl.apply(config));
			$('#exgmobile-viewport').append(el);

			/*** Dom listeners **/

			el.find('button[data-action="apply"]').on('click', function() {
				if (config.handler) {
					config.handler(el);
				} else {
					el.remove();
				}
			});

			el.find('button[data-action="cancel"]').on('click', function() {
				el.remove();
			});

		}
	}

});