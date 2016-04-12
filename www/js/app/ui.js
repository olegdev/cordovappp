/*** UI manager **/

define([
	'logger',
	'underscore',
	'views/toolbar/toolbar',
	'views/window/window'
], function(logger, _, toolbarView, windowView){

	var ui = {
		historyNav: [],

		openPage: function(pageName) {

			/****/ logger.log('Open page "' + pageName + '"');

			var me = this;
			require(['views/' + pageName + '/' + pageName], function(page) {
				var pageTpl = [
					'<div id="exgmobile-page">',
						'<div id="exgmobile-page-tbar"></div>',
						'<div id="exgmobile-page-content"></div>',
						'<div id="exgmobile-page-bbar"></div>',
					'</div>',
				].join('');

				$('#exgmobile-viewport').html(pageTpl);

				if (page.tbar) {
					toolbarView.render($('#exgmobile-page-tbar'), page.tbar, me);
				}

				page.render($('#exgmobile-page-content'));

				if (page.bbar) {
					toolbarView.render($('#exgmobile-page-bbar'), page.bbar, me);
				}

			});

			this.historyNav.push(pageName);
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

	};

	return ui;

});