/***** Bind account page ****/

define([
	'logger',
	'jquery',
	'ui',
	'accounts',
	'translates',
	'views/window/window',
	'views/bind_account_page/bind_account_page.tpl',
], function(logger, $, ui, accounts, translates, windowView, tpl) {

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

			$(renderTo).find('button[data-action="bind-email"]').on('click', function() {
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
								ui.openPage('index_page');
							} else {
								ui.showMsg(err);
							}
						});
					}
				});
			});

			$(renderTo).find('button[data-action="bind-social"]').on('click', function() {
				var target = accounts.get('device');
				var account = accounts.factory($(this).attr('data-type'));
				account.auth(function() {
					if (!accounts.has(account)) {
						account.bind(target, function(err) {
							if (!err) {
								accounts.replace(target, account);
								ui.openPage('index_page');
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
	}

});