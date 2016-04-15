define(['logger', 'errors/auth', 'errors/text'], function(logger, AuthError, TextError) {

	return {
		factory: function(config) {
			if (config.type == 'auth') {
				return new AuthError(config);
			} else if (config.type == 'text') {
				return new TextError(config);
			} else {
				/****/ logger.error('Cannot create error', config);
			}
		}
	}

});