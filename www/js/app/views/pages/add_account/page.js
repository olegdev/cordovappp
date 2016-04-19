/***** Add account page ****/

define([
	'logger',
	'jquery', 
	'ui',
	'accounts', 
	'translates',
	'views/page/page',
	'views/window/window',
	'views/pages/add_account/page.tpl'],
function(logger, $, ui, accounts, translates, PageView, windowView, tpl) {

	return new PageView({
		
		tbar: {
			backBtn: true,
			title: 'Добавить аккаунт',
		},

		bbar: {
			langSelector: true,
		},

		tpl: tpl,

		afterRender: function() {

			this.$rootEl.find('button[data-action="add-email"]').on('click', function() {
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
						account.check(function(err) {
							if (!err) {
								accounts.add(account);
								ui.openPage('index');
							} else {
								ui.showMsg(err);
							}
						});
					}
				});
			});

			this.$rootEl.find('button[data-action="add-social"]').on('click', function() {
				var account = accounts.factory($(this).attr('data-type'));
				account.auth(function() {
					if (!accounts.has(account)) {
						account.check(function(err) {
							if (!err) {
								accounts.add(account);
								ui.openPage("index");
							} else {
								ui.showMsg(err);
							}
						});
					} else {
						ui.showMsg({
							type: "info",
							text: "Account already exists"
						});
					}
				});
			});
		}
	});

});