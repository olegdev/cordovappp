/***

	title
	content
	applyBtnText

*/

define(['underscore', 'translates'], function(_, translates) {
	var tpl = _.template([
		
		'<div class="exgmobile-window">',
			'<div class="exgmobile-header"><span><%= title %></span></div>',
			'<div class="exgmobile-content"><%= content %></div>',
			'<div class="exgmobile-footer">',
				'<button data-action="apply"><%= applyBtnText || translates.t("Применить") %></button>',
				'<button data-action="cancel"><%= translates.t("Отмена") %></button>',
			'</div>',
		'</div>',

	].join(''));

	return {
		apply: function(data) {
			return tpl(_.extend(data || {}, {translates: translates}))
		}
	}
});