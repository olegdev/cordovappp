/***** Message page ****/

define([
	'jquery',
	'views/page/page',
	'views/pages/message/page.tpl'
], function($, PageView, tpl) {
	return new PageView({
		tpl: tpl,
		beforeRender: function() {
			this.tplData = {
				message: this.options.message,
			};
		}
	});
});