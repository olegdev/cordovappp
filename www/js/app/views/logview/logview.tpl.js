define(['underscore', 'logger'], function(_, logger) {
	var tpl = _.template([

		'<div id="exgmobile-logview-toolbar">',
			'<button data-action="clear_storage">clear_storage</button>',
			'<button data-action="expand">expand</button>',
			'<button data-action="collapse">collapse</button>',
			'<button data-action="clear">clear</button>',
			'<button data-action="close">x</button>',
		'</div>',
		'<table>',
			'<% for(var i = 0; i < messages.length; i++) { %>',
				'<tr><td><%= messages[i].type %></td><td><%= messages[i].text %></td></tr>',
			'<% } %>',
		'</table>',

	].join(''));

	return {
		apply: function(data) {
			return tpl(_.defaults(data || {}, {messages: logger.messages}))
		}
	}
});