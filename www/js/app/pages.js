/*** Pages manager **/

define(['underscore', 'views/toolbar/toolbar'], function(_, toolbarView){

	var Pages = {
		historyNav: [],

		openPage: function(pageName) {
			var me = this;
			require(['views/' + pageName + '/' + pageName], function(page) {
				var pageTpl = [
					'<div id="exgmobile-page">',
						'<div id="exgmobile-page-tbar"></div>',
						'<div id="exgmobile-page-content"></div>',
						'<div id="exgmobile-page-bbar"></div>',
					'</div>',
				].join('');

				$(document.body).html(pageTpl);

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

	};

	return Pages;

});