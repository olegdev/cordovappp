var onDeviceReady = function() {

	ExGodsMobile.setDevice(device);

	$(function() {

		if (ExGodsMobile.accounts.list.length) {
			showAccountList();
		} else {
			ExGodsMobile.accounts.check('device', ExGodsMobile.accounts.getDeviceAccountCredentials(), function(account) {
				if (account) {
					showAccountList();
				}
			});
		}

		// ---------- DOM Helpers ----------------//

		// показывает текущий список аккаунтов
		function showAccountList() {
			var rootEl = $('#accounts');
			ExGodsMobile.accounts.list.forEach(function(account, index) {
				rootEl.append('<li><span>'+ account.type  +' - </span><span>'+ account.data.title +'</span><button data-index="'+ index +'">Играть</button></li>');
			});
		}

	});

}

// listen device event and start app script
document.addEventListener('deviceready', onDeviceReady, false);

$(function() {

	//------- Index page DOM-events listeners --------- //

	$('#new-account-btn').click(function() {
		var deviceAccount = ExGodsMobile.accounts.get('device');
		if (deviceAccount) {
			var popup = $('#bind-account-popup').popup('open');
			popup.find('.ok-popup-btn').one('click', function() {
				$( ":mobile-pagecontainer" ).pagecontainer( "change", "#bind-account-page" );
			});
			popup.find('.close-popup-btn').one('click', function() {
				popup.popup('close');
			});
		} else {
			location.href = 'reg.html';	
		}
	});

	$('#add-account-btn').click(function() {
		$( ":mobile-pagecontainer" ).pagecontainer( "change", "#add-account-page" );
	});

	$('#accounts').delegate('button', 'click', function() {
		ExGodsMobile.accounts.loginBy(ExGodsMobile.accounts.list[parseInt(this.getAttribute('data-index'))]);
	});


	//------- Bind account page DOM-events listeners --------- //

	$('#bind-account-page button[data-type="email"]').click(function() {
		var target = ExGodsMobile.accounts.get('device');
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
	});

    //------- Add account page DOM-events listeners --------- //

	$('#add-account-page button[data-type="email"]').click(function() {
		var popup = $('#email-add-popup').popup('open');
		popup.find('.ok-popup-btn').one('click', function() {
			ExGodsMobile.accounts.check('email', {
				login: popup.find('input[name="email"]').val(),
				pass: popup.find('input[name="epass"]').val()
			}, function(account) {
				if (account) {
					location.href = 'index.html';
				}
			});
		});
		popup.find('.close-popup-btn').one('click', function() {
			popup.popup('close');
		});
	});
});


// debug
window.device = {uuid: 1278, platform: 'ios'};
navigator.globalization = {
	getPreferredLanguage: function() {
		return 'ru';
	}
};
onDeviceReady();