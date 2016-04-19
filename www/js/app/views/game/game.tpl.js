define(['underscore', 'translates'], function(_, translates) {
	var tpl = _.template([

		'<div id="viewport-wrapper"></div>',

	].join(''));

	return {
		apply: function() {
			return tpl();
		}
	}
});