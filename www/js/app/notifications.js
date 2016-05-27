/**
 * Push-уведомления
 */
define([
	'logger',
	'underscore',
	'storage',
], function(logger, _, storage) {

	return {
		init: function() {

			/***/ logger.log('Push notifications: init..');

			var push = PushNotification.init({
			    ios: {
			        alert: "true",
			        badge: true,
			        sound: 'true'
			    },
			});

			push.on('registration', function(data) {
				/***/ logger.log('Push notifications: registration success', data.registrationId);
			});
		}
	}

});