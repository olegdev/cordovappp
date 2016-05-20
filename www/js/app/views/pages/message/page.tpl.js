define(['underscore'], function(_) {
	var tpl = _.template([

		'<%= message %>'

	].join(''));

	return {
		apply: function(data) {
			return tpl(_.extend(data || {}))
		}
	}
});