define(['underscore'], function(_) {
	var tpl = _.template([

		'GAME',

	].join(''));

	return {
		apply: function(data) {
			return tpl(_.extend(data || {}))
		}
	}
});