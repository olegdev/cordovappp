define(['underscore'], function(_) {

	var messages = [],
		listeners = [];

	var onMessage = function(type, args) {
		var text = _.map([].slice.call(args), function(item) {
				if (typeof item != 'string') {
					return JSON.stringify(item);
				} else {
					return item;
				}
			}).join(' '),
			msg = {
				type: type,
				text: text,
			}

		messages.push(msg);

		console[type](text);

		if (listeners.length) {
			for(var i = 0; i < listeners.length; i++) {
				listeners[i](msg);
			}
		}

		return msg;
	}

	return {

		messages: messages,

		error: function() {
			return onMessage('error', arguments);
		},
		warn: function() {
			return onMessage('warn', arguments);
		},
		log: function() {
			return onMessage('log', arguments);
		}, 
		addListener: function(listener) {
			listeners.push(listener);
		}
	}

});