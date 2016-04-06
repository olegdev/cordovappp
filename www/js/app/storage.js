define(function() {

	return {
		setItem: function(key, value) {
			window.localStorage.setItem(key, JSON.stringify(value));
		},
		getItem: function(key, defaults) {
			var value = window.localStorage.getItem(key);
			return value ? JSON.parse(value) : defaults;
		}
	}

});