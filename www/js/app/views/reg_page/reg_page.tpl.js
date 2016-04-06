define(['underscore', 'translates'], function(_, translates) {
	var tpl = _.template([

		'<div id="exgmobile-reg-page">',
			'<form action="" method="post">',
				'<input name="cmd" type="hidden" value="mobile_create" />',

				'<fieldset class="reg-step" id="exgmobile-reg-page-step-gender" style="display: block;">',
					'<input class="gender" id="exgmobile-reg-page-gender-af" name="gender" type="radio" value="22" />',
					'<label class="gender" for="exgmobile-reg-page-gender-af" id="exgmobile-reg-page-gender-af-img">',
						'<input class="button gender-button" id="exgmobile-reg-page-gender-af-button" type="button" />',
					'</label>',

					'<input class="gender" id="exgmobile-reg-page-gender-am" name="gender" type="radio" value="21" />',
					'<label class="gender" for="exgmobile-reg-page-gender-am" id="exgmobile-reg-page-gender-am-img">',
						'<input class="button gender-button" id="exgmobile-reg-page-gender-am-button" type="button" />',
					'</label>',

					'<input class="gender" id="exgmobile-reg-page-gender-vm" name="gender" type="radio" value="31" />',
					'<label class="gender" for="exgmobile-reg-page-gender-vm" id="exgmobile-reg-page-gender-vm-img">',
						'<input class="button gender-button" id="exgmobile-reg-page-gender-vm-button" type="button" />',
					'</label>',
					
					'<input class="gender" id="exgmobile-reg-page-gender-vf" name="gender" type="radio" value="32" />',
					'<label class="gender" for="exgmobile-reg-page-gender-vf" id="exgmobile-reg-page-gender-vf-img">',
						'<input class="button gender-button" id="exgmobile-reg-page-gender-vf-button" type="button" />',
					'</label>',
					
					'<p id="exgmobile-reg-page-eula">Выбирая воплощение, Вы соглашаетесь с <a href="../eula.html" target="_blank">законами и правилами</a> Ожерелья миров</p>',
				'</fieldset>',
				
				'<fieldset class="reg-step" id="exgmobile-reg-page-step-name">',
					'<div class="container">',
						'<h6></h6>',
						'<div class="text">',
							'<p>Мы ждали тебя, и вот ты здесь! Бессмертная душа, готовая воплотиться в смертное тело и помочь нам победить Извечных Врагов, Титаны приветствуют тебя! Да пребудет твой путь в свете!</p>',
							'<p><strong>Скажи, как нам тебя называть?</strong></p>',
						'</div>',
						'<div class="field">',
							'<div class="input">',
								'<div class="input-border">',
									'<input id="exgmobile-reg-page-name" maxlength="20" minlength="3" name="title" placeholder="Введите имя персонажа" type="text" />',
								'</div>',
							'</div>',
							'<label class="status" for="exgmobile-reg-page-name"></label>',
						'</div>',
						
						'<div class="error-container">',
							'<label class="error" for="exgmobile-reg-page-name" generated="true"></label>',
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