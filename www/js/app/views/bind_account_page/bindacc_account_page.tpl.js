define(['underscore'], function(_) {
	var tpl = _.template([

		'Bind acc',

	].join(''));

	return {
		apply: function(data) {
			return tpl(_.extend(data || {}))
		}
	}
});