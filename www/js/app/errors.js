define(['logger', 'errors/auth'], function(logger, AuthError) {

	return {
		factory: function(config) {
			if (config.type == 'auth') {
				return new AuthError(config);
			} else {
				/****/ logger.error('Cannot create error', config);
			}
		}
	}

});