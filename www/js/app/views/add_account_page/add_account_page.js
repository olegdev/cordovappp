/***** Add account page ****/

define([
	'logger',
	'jquery', 
	'pages',
	'accounts', 
	'translates',
	'views/window/window',
	'views/add_account_page/add_account_page.tpl'],
function(logger, $, pages, accounts, translates, windowView, tpl) {

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

			$(renderTo).find('button[data-action="add-email"]').on('click', function() {
				windowView.render({
					title: translates.t("Добавить"),
					content: [
						'<input name="email" type="email" placeholder="'+ translates.t('Email') +'">',
						'<input name="epass" type="password" placeholder="'+ translates.t('Пароль') +'">',
					].join(''),
					applyBtnText: translates.t("Добавить"),
					handler: function(el) {
						var account = accounts.factory("email");
						account.credentials.login = el.find('input[name="email"]').val();
						account.credentials.pass = el.find('input[name="epass"]').val();
						account.check(function(err, check) {
							if (!err) {
								if (check) {
									accounts.add(account);
									pages.openPage('index_page');
								} else {
									/***/ logger.log("Account is unknown. Check your credentials.");
								}
							} else {
								/***/ logger.error("Cannot add email account cause", err);
							}
						});
					}
				});
			});

			$(renderTo).find('button[data-action="add-fb"]').on('click', function() {
				var account = accounts.factory("fb");
				account.check(function(err, check) {
					if (!err) {
						if (check) {
							accounts.add(account);
							pages.openPage("index_page");
						} else {
							/***/ logger.log("Account is unknown. Check your credentials.");
						}
					} else {
						/***/ logger.error("Cannot add fb account cause", err);
					}
				});
			});
		}
	}

});