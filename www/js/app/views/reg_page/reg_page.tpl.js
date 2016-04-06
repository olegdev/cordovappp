define(['underscore', 'translates'], function(_, translates) {
	var tpl = _.template([

		'<div id="exgmobile-reg">',
			'<form action="" method="post">',
				'<input name="cmd" type="hidden" value="mobile_create" />',

				'<fieldset class="reg-step" id="exgmobile-reg-step-gender" style="display: block;">',
					'<input class="gender" id="exgmobile-reg-gender-af" name="gender" type="radio" value="22" />',
					'<label class="gender" for="exgmobile-reg-gender-af" id="exgmobile-reg-gender-af-img">',
						'<input class="button gender-button" id="exgmobile-reg-gender-af-button" type="button" />',
					'</label>',

					'<input class="gender" id="exgmobile-reg-gender-am" name="gender" type="radio" value="21" />',
					'<label class="gender" for="exgmobile-reg-gender-am" id="exgmobile-reg-gender-am-img">',
						'<input class="button gender-button" id="exgmobile-reg-gender-am-button" type="button" />',
					'</label>',

					'<input class="gender" id="exgmobile-reg-gender-vm" name="gender" type="radio" value="31" />',
					'<label class="gender" for="exgmobile-reg-gender-vm" id="exgmobile-reg-gender-vm-img">',
						'<input class="button gender-button" id="exgmobile-reg-gender-vm-button" type="button" />',
					'</label>',
					
					'<input class="gender" id="exgmobile-reg-gender-vf" name="gender" type="radio" value="32" />',
					'<label class="gender" for="exgmobile-reg-gender-vf" id="exgmobile-reg-gender-vf-img">',
						'<input class="button gender-button" id="exgmobile-reg-gender-vf-button" type="button" />',
					'</label>',
					
					'<p id="exgmobile-reg-eula"><%= translates.t("Регистрация: Соглашение") %></p>',
				'</fieldset>',
				
				'<fieldset class="reg-step" id="exgmobile-reg-step-name">',
					'<div class="container">',
						'<h6></h6>',
						'<div class="text">',
							'<%= translates.t("Регистрация: Приветствие") %>',
						'</div>',
						'<div class="field">',
							'<div class="input">',
								'<div class="input-border">',
									'<input id="exgmobile-reg-name" maxlength="20" minlength="3" name="title" placeholder="<%= translates.t("Введите имя персонажа") %>" type="text" />',
								'</div>',
							'</div>',
							'<label class="status" for="exgmobile-reg-name"></label>',
						'</div>',
						
						'<div class="error-container">',
							'<label class="error" for="exgmobile-reg-name" generated="true"></label>',
						'</div>',
						
						'<input class="button submit" type="submit" value="" />',
						'<input class="button prev" type="button" />',
					'</div>',
				'</fieldset>',
			'</form>',
		'</div>'

	].join(''));

	return {
		apply: function(data) {
			return tpl(_.extend(data || {}, {translates: translates}))
		}
	}
});