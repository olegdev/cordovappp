define(['underscore'], function(_) {
	var tpl = _.template([

		'<div id="exgmobile-page">',
			'<div id="exgmobile-page-tbar"></div>',
			'<div id="exgmobile-page-content"></div>',
			'<div id="exgmobile-page-bbar"></div>',
		'</div>',

	].join(''));

	return {
		apply: function() {
			return tpl();
		}
	}
});