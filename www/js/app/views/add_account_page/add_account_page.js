/***** Add account page ****/

define([
	'jquery', 
	'pages',
	'accounts', 
	'translates',
	'views/window/window',
	'views/add_account_page/add_account_page.tpl'],
function($, pages, accounts, translates, windowView, tpl) {

	return {

		tbar: {
			backBtn: true,
			title: 'Добавить аккаунт',
		},

		bbar: {
			langSelector: true,
		},

		render: function(renderTo) {
			$(renderTo).html(tpl.apply());

			$(renderTo).find('button[data-action="add-email"]').click(function() {
				windowView.render({
					title: translates.t("Добавить"),
					content: [
						'<input name="email" type="email" placeholder="'+ translates.t('Email') +'">',
						'<input name="epass" type="password" placeholder="'+ translates.t('Пароль') +'">',
					].join(''),
					applyBtnText: translates.t("Добавить"),
					handler: function(el) {
						accounts.check('email', {
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