/***** Index page ****/

define([
	'jquery',
	'app',
	'accounts',
	'translates',
	'ui',
	'views/window/window',
	'views/index_page/index_page.tpl'
], function($, app, accounts, translates, ui, windowView, tpl) {

	return {

		tbar: {
			title: 'Главная страница',
		},

		bbar: {
			langSelector: true,
		},

		render: function(renderTo) {
			$(renderTo).html(tpl.apply());

			/*** Dom listeners **/

			$(renderTo).find('.exgmobile-accounts').delegate('button', 'click', function() {
				accounts.list[parseInt(this.getAttribute('data-index'))].login(function(err) {
					if (!err) {
						ui.openPage('game_page');
					} else {
						ui.showMsg(err);
					}
				});
			});

			$(renderTo).find('button[data-action="new"]').on('click', function() {
				var deviceAccount = accounts.get('device');
				if (deviceAccount) {
					windowView.render({
						title: translates.t("Привязать"),
						content: translates.t("Необходимо привязать аккаунт, прежде чем создать новый"),
						applyBtnText: translates.t("Привязать"),
						handler: function() {
							ui.openPage('bind_account_page');
						}
					});
				} else {
					ui.openPage('reg_page');
				}
			});

			$(renderTo).find('button[data-action="add"]').on('click', function() {
				ui.openPage('add_account_page');
			});

		}
	}

});