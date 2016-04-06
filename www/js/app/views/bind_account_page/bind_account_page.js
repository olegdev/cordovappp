/***** Bind account page ****/

define(['jquery', 'views/bind_account_page/bind_account_page.tpl'], function($, tpl) {

	return {
		render: function(renderTo) {
			$(renderTo).html(tpl.apply());
		}
	}

});