/***** Game page ****/

define(['jquery', 'views/game_page/game_page.tpl'], function($, tpl) {

	return {
		render: function(renderTo) {
			$(renderTo).html(tpl.apply());
		}
	}

});