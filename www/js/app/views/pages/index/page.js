/***** Index page ****/

define([
	'jquery',
	'app',
	'accounts',
	'translates',
	'views/page/page',
	'views/window/window',
	'views/pages/index/page.tpl',
], function($, app, accounts, translates, PageView, windowView, tpl) {

	return new PageView({
		
		tbar: {
			title: 'Главная страница',
		},

		bbar: {
			langSelector: true,
		},

		tpl: tpl, 

		afterRender: function() {

			this.$rootEl.find('.exgmobile-accounts').delegate('button', 'click', function() {
				accounts.list[parseInt(this.getAttribute('data-index'))].login(function(err) {
					if (!err) {
						ExgMobile.ui.showGame();
					} else {
						ExgMobile.ui.showMsg(err);
					}
				});
			});

			this.$rootEl.find('button[data-action="new"]').on('click', function() {
				var deviceAccount = accounts.get('device');
				if (deviceAccount) {
					windowView.render({
						title: translates.t("Привязать"),
						content: translates.t("Необходимо привязать аккаунт, прежде чем создать новый"),
						applyBtnText: translates.t("Привязать"),
						handler: function() {
							ExgMobile.ui.openPage('bind_account');
						}
					});
				} else {
					ExgMobile.ui.openPage('reg');
				}
			});

			this.$rootEl.find('button[data-action="add"]').on('click', function() {
				ExgMobile.ui.openPage('add_account');
			});
		}
	});

});