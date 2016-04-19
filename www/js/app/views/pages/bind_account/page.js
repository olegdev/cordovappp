/***** Bind account page ****/

define([
	'logger',
	'jquery',
	'accounts',
	'translates',
	'views/page/page',
	'views/window/window',
	'views/pages/bind_account/page.tpl',
], function(logger, $, accounts, translates, PageView, windowView, tpl) {

	return new PageView({

		tbar: {
			backBtn: true,
			title: 'Привязать аккаунт',
		},

		bbar: {
			langSelector: true,
		},

		tpl: tpl,

		afterRender: function() {
			this.$rootEl.find('button[data-action="bind-email"]').on('click', function() {
				var target = accounts.get('device');
				windowView.render({
					title: translates.t("Привязать"),
					content: [
						'<input name="email" type="email" placeholder="'+ translates.t('Email') +'">',
						'<input name="epass" type="password" placeholder="'+ translates.t('Пароль') +'">',
					].join(''),
					applyBtnText: translates.t("Привязать"),
					handler: function(el) {
						var account = accounts.factory("email");
						account.credentials.login = el.find('input[name="email"]').val();
						account.credentials.pass = el.find('input[name="epass"]').val();
						account.bind(target, function(err) {
							if (!err) {
								accounts.replace(target, account);
								ExgMobile.ui.openPage('index');
							} else {
								ExgMobile.ui.showMsg(err);
							}
						});
					}
				});
			});

			this.$rootEl.find('button[data-action="bind-social"]').on('click', function() {
				var target = accounts.get('device');
				var account = accounts.factory($(this).attr('data-type'));
				account.auth(function() {
					if (!accounts.has(account)) {
						account.bind(target, function(err) {
							if (!err) {
								accounts.replace(target, account);
								ExgMobile.ui.openPage('index');
							} else {
								ExgMobile.ui.showMsg(err);
							}
						});
					} else {
						ExgMobile.ui.showMsg({
							type: "info",
							text: "Account already exists"
						});
					}
				});
			});
		}

	});

});