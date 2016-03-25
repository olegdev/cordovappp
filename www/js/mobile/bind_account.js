$(function() {

	var target;
	if (location.search) {
		target = ExGodsMobile.accounts.get('device');
	}

	if (target) {
		$('.container h1').html('Привязать аккаунт');
	} else {
		$('.container h1').html('Добавить аккаунт');
	}

	/** ---------- DOM listeners ----------- */

	$('#email-bind-btn').click(function() {
		if (target) {
			var popup = $('#email-bind-popup').popup('open');
			popup.find('.ok-popup-btn').one('click', function() {
				ExGodsMobile.accounts.bind(target, 'email', {
					email: popup.find('input[name="email"]').val(),
					epass: popup.find('input[name="epass"]').val()
				}, function() {
					location.href = 'index.html';
				});
			});
			popup.find('.close-popup-btn').one('click', function() {
				popup.popup('close');
			});
		} else {
			var popup = $('#email-bind-popup').popup('open');
			popup.find('.ok-popup-btn').one('click', function() {
				ExGodsMobile.accounts.bind(target, 'email', {
					email: popup.find('input[name="email"]').val(),
					epass: popup.find('input[name="epass"]').val()
				}, function() {
					location.href = 'index.html';
				});
			});
			popup.find('.close-popup-btn').one('click', function() {
				popup.popup('close');
			});
		}
	});


});