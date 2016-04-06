define(['config', 'underscore', 'translates'], function(config, _, translates) {
	var tpl = _.template([

		'<select class="exgmobile-lang-select">',
			'<% for(var i = 0; i < langs.length; i++) { %>',
				'<option value="<%= langs[i] %>" <%= translates.lang == langs[i] ? "selected" : "" %> ><%= langs[i] %></option>',
			'<% } %>',
		'</select>',

	].join(''));

	return {
		apply: function(data) {
			return tpl(_.defaults(data || {}, {translates: translates, langs: config.langs}, {title: '', backBtn: false}))
		}
	}
});