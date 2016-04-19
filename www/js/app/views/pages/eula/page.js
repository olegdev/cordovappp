/***** Eula page ****/

define([
	'jquery',
	'views/page/page',
	'views/pages/eula/page.tpl'
], function($, PageView, tpl) {
	return new PageView({
		tpl: tpl,
		tbar: {
			backBtn: true,
		},
	});
});