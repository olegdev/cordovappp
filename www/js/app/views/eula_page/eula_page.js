/***** Eula page ****/

define(['jquery', 'views/eula_page/eula_page.tpl'], function($, tpl) {

	return {

		tbar: {
			backBtn: true,
		},

		render: function(renderTo) {
			$(renderTo).html(tpl.apply());
		}
	}

});