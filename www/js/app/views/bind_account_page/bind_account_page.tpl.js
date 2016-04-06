define(['underscore', 'translates'], function(_, translates) {
	var tpl = _.template([

		'<button data-action="add-email"><%= translates.t("Email") %></button>',

	].join(''));

	return {
		apply: function(data) {
			return tpl(_.extend(data || {}, {translates: translates}))
		}
	}
});