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
			$(document.body).append(el);

			/*** Dom listeners **/

			el.find('button[data-action="apply"]').click(function() {
				if (config.handler) {
					config.handler(el);
				}
			});

			el.find('button[data-action="cancel"]').click(function() {
				el.remove();
			});

		}
	}

});