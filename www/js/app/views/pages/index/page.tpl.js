define(['underscore', 'accounts', 'translates'], function(_, accounts, translates) {
	var tpl = _.template([

		'<ul class="exgmobile-accounts">',
			'<% for(var i = 0; i < accounts.list.length; i++) { %>',
				'<li><%= accounts.list[i].type %> <%= accounts.list[i].data.title %>',
					'<button data-index="<%= i %>"><%= translates.t("Играть") %></button>',
				'</li>',
			'<% } %>',
		'</ul>',

		'<button data-action="new"><%= translates.t("Новый") %></button>',
		'<button data-action="add"><%= translates.t("Добавить") %></button>'

	].join(''));

	return {
		apply: function(data) {
			return tpl(_.extend(data || {}, {accounts: accounts, translates: translates}))
		}
	}
});

