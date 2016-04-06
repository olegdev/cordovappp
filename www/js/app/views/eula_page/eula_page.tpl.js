define(['underscore', 'translates'], function(_, translates) {
	var tpl = _.template([

		'<%= translates.t("EULA: текст") %>'

	].join(''));

	return {
		apply: function(data) {
			return tpl(_.extend(data || {}, {translates: translates}))
		}
	}
});