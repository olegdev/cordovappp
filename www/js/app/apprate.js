/**
 * Рейтинг приложения
 */
define([
	'logger',
	'underscore',
	'storage',
], function(logger, _, storage) {

	return {
		init: function() {
			/***/ logger.log('App rate: init..');
        	AppRate.promptForRating(false); 
		}
	}

});