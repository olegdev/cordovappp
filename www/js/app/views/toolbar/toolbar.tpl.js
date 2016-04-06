define(['underscore', 'translates'], function(_, translates) {
	var tpl = _.template([

		'<div class="exgmobile-toolbar">',
			'<% if (backBtn) { %>',
				'<button data-action="back"><%= translates.t("Назад") %></button>',
			'<% } %>',
			'<% if (title) { %>',
				'<h1><%= translates.t(title) %></h1>',
			'<% } %>',
		'</div>',

	].join(''));

	return {
		apply: function(data) {
			return tpl(_.defaults(data, {translates: translates}, {title: '', backBtn: false}))
		}
	}
});