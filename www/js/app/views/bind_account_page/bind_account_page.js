/***** Bind account page ****/

define([
	'jquery',
	'pages',
	'accounts',
	'translates',
	'views/window/window',
	'views/bind_account_page/bind_account_page.tpl',
], function($, pages, accounts, translates, windowView, tpl) {

	return {

		tbar: {
			backBtn: true,
			title: 'Привязать аккаунт',
		},

		bbar: {
			langSelector: true,
		},

		render: function(renderTo) {
			$(renderTo).html(tpl.apply());

			$(renderTo).find('button[data-action="add-email"]').click(function() {
				var target = accounts.get('device');
				windowView.render({
					title: translates.t("Привязать"),
					content: [
						'<input name="email" type="email" placeholder="'+ translates.t('Email') +'">',
						'<input name="epass" type="password" placeholder="'+ translates.t('Пароль') +'">',
					].join(''),
					applyBtnText: translates.t("Привязать"),
					handler: function(el) {
						accounts.bind(target, 'email', {
							login: el.find('input[name="email"]').val(),
							pass: el.find('input[name="epass"]').val()
						}, function(account) {
							if (account) {
								pages.openPage('index_page');
							}
						});
					}
				});
			});
		}
	}

});