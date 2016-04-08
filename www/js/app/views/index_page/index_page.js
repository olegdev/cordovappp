/***** Index page ****/

define([
	'jquery',
	'app',
	'accounts',
	'translates',
	'pages',
	'views/window/window',
	'views/index_page/index_page.tpl'
], function($, app, accounts, translates, pages, windowView, tpl) {

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
						pages.openPage('game_page');
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
							pages.openPage('bind_account_page');
						}
					});
				} else {
					pages.openPage('reg_page');
				}
			});

			$(renderTo).find('button[data-action="add"]').on('click', function() {
				pages.openPage('add_account_page');
			});

		}
	}

});