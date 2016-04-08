define(['underscore', 'translates'], function(_, translates) {
	var tpl = _.template([

		'<button data-action="add-email"><%= translates.t("Email") %></button>',
		'<button data-action="add-fb">Facebook</button>',

	].join(''));

	return {
		apply: function(data) {
			return tpl(_.defaults(data || {}, {translates: translates}))
		}
	}
});