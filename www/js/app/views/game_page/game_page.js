/***** Game page ****/

define(['jquery', 'views/game_page/game_page.tpl'], function($, tpl) {

	return {

		tbar: {
			backBtn: true,
		},
		
		render: function(renderTo) {
			$(renderTo).html(tpl.apply());
		}
	}

});