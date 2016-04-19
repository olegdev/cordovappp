define(['underscore', 'translates'], function(_, translates) {
	var tpl = _.template([

		'<button data-action="bind-email"><%= translates.t("Email") %></button>',
		'<button data-action="bind-social" data-type="fb">Facebook</button>',
		'<button data-action="bind-social" data-type="vk">VK</button>',
		'<button data-action="bind-social" data-type="ok">OK</button>',
		'<button data-action="bind-social" data-type="mm">MM</button>',

	].join(''));

	return {
		apply: function(data) {
			return tpl(_.extend(data || {}, {translates: translates}))
		}
	}
});