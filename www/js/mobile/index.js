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

		//------- DOM-events listeners --------- //

		$('#new-account-btn').click(function() {
			var deviceAccount = ExGodsMobile.accounts.get('device');
			if (deviceAccount) {
				var popup = $('#bindAccountPopup').popup('open');
				popup.find('.ok-popup-btn').one('click', function() {
					location.href = 'bind_account.html?bind=1';
				});
				popup.find('.close-popup-btn').one('click', function() {
					popup.popup('close');
				});
			} else {
				location.href = 'reg.html';	
			}
		});

		$('#add-account-btn').click(function() {
			location.href = 'bind_account.html';
		});

		$('#accounts').delegate('button', 'click', function() {
			ExGodsMobile.accounts.loginBy(ExGodsMobile.accounts.list[parseInt(this.getAttribute('data-index'))]);
		});

	});

}

// listen device event and start app script
document.addEventListener('deviceready', onDeviceReady, false);

// debug
window.device = {uuid: 12345667, platform: 'ios'};
onDeviceReady();