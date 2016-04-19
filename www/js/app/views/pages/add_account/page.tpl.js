define(['underscore', 'translates'], function(_, translates) {
	var tpl = _.template([

		'<button data-action="add-email"><%= translates.t("Email") %></button>',
		'<button data-action="add-social" data-type="fb">Facebook</button>',
		'<button data-action="add-social" data-type="vk">VK</button>',
		'<button data-action="add-social" data-type="ok">OK</button>',
		'<button data-action="add-social" data-type="mm">MM</button>',

	].join(''));

	return {
		apply: function(data) {
			return tpl(_.defaults(data || {}, {translates: translates}))
		}
	}
});