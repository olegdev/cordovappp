/***** Eula page ****/

define([
	'jquery',
	'views/page/page',
	'views/pages/eula/page.tpl'
], function($, PageView, tpl) {
	return new PageView({
		tpl: tpl,
		render: function(renderTo, options) {
			this.tplData = {
				message: options ? options.message : ""
			}
		},
	});
});