/*** UI manager **/

define([
	'logger',
	'underscore',
	'views/toolbar/toolbar',
	'views/window/window',
	'views/game/game',
], function(logger, _, toolbarView, windowView, gameView){

	var ui = {
		historyNav: [],

		openPage: function(pageName) {

			/****/ logger.log('Open page "' + pageName + '"');

			var me = this;
			require(['views/pages/' + pageName + '/page'], function(page) {
				page.render($('#exgmobile-viewport'));
				me.historyNav.push(pageName);
			});
		},

		reloadPage: function() {
			this.openPage(this.historyNav.pop());
		},

		back: function() {
			var pageName;
			if (this.historyNav.length > 1) {
				pageName = this.historyNav[this.historyNav.length-2];
				this.historyNav = this.historyNav.slice(0, this.historyNav.length-2);
				this.openPage(pageName);
			}
		},

		showMsg: function(msg) {
			windowView.render({
				title: 'Error',
				content: msg.text,
				applyBtnText: 'Ok',
			});
		},

		showGame: function() {
			$('html').css({ backgroundColor: '#000' });
			gameView.render(document.body);
		},
	};

	return ui;

});