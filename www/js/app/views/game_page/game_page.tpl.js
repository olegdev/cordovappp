define(['underscore', 'translates'], function(_, translates) {
	var tpl = _.template([

		'GAME',

	].join(''));

	return {
		apply: function(data) {
			return tpl(_.extend(data || {}, {translates: translates}))
		}
	}
});