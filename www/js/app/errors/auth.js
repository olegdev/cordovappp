/*** Server auth error class */

define(function() {

	var Error = function(config) {
		this.type = 'auth';
		this.text = JSON.stringify(config.response);
	};

	return Error;
});