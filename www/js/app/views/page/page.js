/***** Page class ****/

define([
	'jquery',
	'underscore',
	'views/toolbar/toolbar',
	'views/page/page.tpl',
], function($, _, toolbarView, pageTpl) {

	var Page = function(config) {
		_.extend(this, config);
	}

	/*** @cfg **/
	Page.prototype.tpl = null;
	Page.prototype.tplData = {};
	Page.prototype.tbar = null;
	Page.prototype.bbar = null;

	Page.prototype.render = function(renderTo, options) {

		this.options = options || {};

		this.beforeRender();

		this.$rootEl = $(renderTo);

		$(renderTo).html(pageTpl.apply());

		if (this.tbar) {
			toolbarView.render($('#exgmobile-page-tbar'), this.tbar);
		}

		if (this.bbar) {
			toolbarView.render($('#exgmobile-page-bbar'), this.bbar);
		}

		if (this.tpl) {
			$('#exgmobile-page-content').html(this.tpl.apply(this.tplData));
		}

		this.afterRender();
	};

	Page.prototype.beforeRender = function() {
		//
	}	

	Page.prototype.afterRender = function() {
		//
	}	

	return Page;

});