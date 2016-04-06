/***** Reg page ****/

define([
	'jquery',
	'jquery-placeholder',
	'jquery-validation',
	'jquery-form',
	'config',
	'app',
	'translates',
	'accounts',
	'pages',
	'views/reg_page/reg_page.tpl'],
function($, jqPlaceholder, jqValidation, jqForm, config, app, translates, accounts, pages, tpl) {	

	return {

		render: function(renderTo) {

			// define dynamic styles with translatable images
			var style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML = [
				'#exgmobile-reg-page, #exgmobile-reg-page form  {',
	    			'background-image: url( ./img/'+ translates.t('reg/bg_all.jpg') + ');',
	    		'}',				
				'#exgmobile-reg-page.as {',
				   ' background-image: url( ./img/'+ translates.t('reg/bg_as.jpg') + ') !important;',
				'}',
				'#exgmobile-reg-page.van {',
				    'background-image: url( ./img/'+ translates.t('reg/bg_van.jpg') + ') !important;',
				'}',
				'#exgmobile-reg-page label.gender input.button {',
				    'background-image: url( ./img/'+ translates.t('reg/button-choose.png') + ');',
				'}',
				'#exgmobile-reg-page input.prev {',
				   ' background-image: url( ./img/'+ translates.t('reg/button-prev.png') + ');',
				'}',
				'#exgmobile-reg-page input.next {',
				    'background-image: url( ./img/'+ translates.t('reg/button-next.png') + ');',
				'}',
				'#exgmobile-reg-page input.submit {',
				    'background-image: url( ./img/'+ translates.t('reg/button-submit.png') + ');',
				   ' width: 190px;',
				'}'
			].join('');
			document.getElementsByTagName('head')[0].appendChild(style);

			/*
			 * Translated default messages for the jQuery validation plugin.
			 */
			jQuery.extend(jQuery.validator.messages, {
				required: "Это поле необходимо заполнить",
				regFormValidation: {
					name: {
						required: "Имя не задано",
						minlength: jQuery.validator.format("Минимальная длина имени {0} символа"),
						maxlength: jQuery.validator.format("Максимальная длина имени {0} символов")
					},

					email: {
						email: "Неверный адрес почты"
					}
				}
			});

			/** Overrides remote validation */

			// $.validator.methods.remote = function(value, element, param) {
			// 	var me = this;

			// 	if ( this.optional(element) ) {
			// 		return "dependency-mismatch";
			// 	}

			// 	var previous = this.previousValue(element);
			// 	if (!this.settings.messages[element.name] ) {
			// 		this.settings.messages[element.name] = {};
			// 	}
			// 	previous.originalMessage = this.settings.messages[element.name].remote;
			// 	this.settings.messages[element.name].remote = previous.message;

			// 	param = typeof param === "string" && {url:param} || param;

			// 	if ( this.pending[element.name] ) {
			// 		return "pending";
			// 	}
			// 	if ( previous.old === value ) {
			// 		return previous.valid;
			// 	}
				
			// 	var label = $('label.status[for="' + element.id + '"]'),
			// 		input = getFieldset(element).find('input.next, input.submit');
					
			// 	label.addClass('status-pending');
			// 	input.prop('disabled', true);
				
			// 	clearTimeout(this.requestTimeout);
				
			// 	this.requestTimeout = setTimeout(function() {
			// 		previous.old = value;
			// 		var validator = me;
			// 		me.startRequest(element);
			// 		var data = {};
			// 		data[element.name] = value;
				
			// 		$.ajax($.extend(true, {
			// 			url: param,
			// 			mode: "abort",
			// 			port: "validate" + element.name,
			// 			dataType: "json",
			// 			data: data,
			// 			success: function(response) {
			// 				validator.settings.messages[element.name].remote = previous.originalMessage;
			// 				var valid = response === true || response === "true";
			// 				if ( valid ) {
			// 					var submitted = validator.formSubmitted;
			// 					validator.prepareElement(element);
			// 					validator.formSubmitted = submitted;
			// 					validator.successList.push(element);
			// 					delete validator.invalid[element.name];
			// 					validator.showErrors();
			// 				} else {
			// 					var errors = {};
			// 					var message = response || validator.defaultMessage( element, "remote" );
			// 					errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
			// 					validator.invalid[element.name] = true;
			// 					validator.showErrors(errors);
			// 				}
			// 				previous.valid = valid;
			// 				validator.stopRequest(element, valid);
							
			// 				label.removeClass('status-pending');
			// 				input.prop('disabled', false);
			// 			}
			// 		}, param));
			// 	}, 500);
				
			// 	return "pending";
			// };

			$.validator.methods.remote = function( value, element, param, method ) {
				if ( this.optional( element ) ) {
					return "dependency-mismatch";
				}

				method = typeof method === "string" && method || "remote";

				var previous = this.previousValue( element, method ),
					validator, data, optionDataString;

				if ( !this.settings.messages[ element.name ] ) {
					this.settings.messages[ element.name ] = {};
				}
				previous.originalMessage = previous.originalMessage || this.settings.messages[ element.name ][ method ];
				this.settings.messages[ element.name ][ method ] = previous.message;

				param = typeof param === "string" && { url: param } || param;
				optionDataString = $.param( $.extend( { data: value }, param.data ) );
				if ( previous.old === optionDataString ) {
					return previous.valid;
				}

				var label = $('label.status[for="' + element.id + '"]'),
					input = $(element).closest('fieldset').find('input.next, input.submit');
					
				label.addClass('status-pending');
				input.prop('disabled', true);

				clearTimeout(this.requestTimeout);
				validator = this;
				this.requestTimeout = setTimeout(function() {
					previous.old = optionDataString;
					validator.startRequest( element );
					data = {};
					data[ element.name ] = value;
					$.ajax( $.extend( true, {
						mode: "abort",
						port: "validate" + element.name,
						dataType: "json",
						data: data,
						context: validator.currentForm,
						success: function( response ) {
							var valid = response === true || response === "true",
								errors, message, submitted;

							validator.settings.messages[ element.name ][ method ] = previous.originalMessage;
							if ( valid ) {
								submitted = validator.formSubmitted;
								validator.resetInternals();
								validator.toHide = validator.errorsFor( element );
								validator.formSubmitted = submitted;
								validator.successList.push( element );
								validator.invalid[ element.name ] = false;
								validator.showErrors();
							} else {
								errors = {};
								message = response || validator.defaultMessage( element, { method: method, parameters: value } );
								errors[ element.name ] = previous.message = message;
								validator.invalid[ element.name ] = true;
								validator.showErrors( errors );
							}
							previous.valid = valid;
							validator.stopRequest( element, valid );

							label.removeClass('status-pending');
							input.prop('disabled', false);
						}
					}, param ) );
				}, 500);
				return "pending";
			}

			/**** Render the page ***/

			$(renderTo).html(tpl.apply());

			/*** Dom listeners **/

			$('#exgmobile-reg-page input[placeholder]').placeholder();
			
			var regForm = $('#exgmobile-reg-page form'),
				gender,
				race,
				flip = undefined;
				
			regForm[0].reset();
			
			function setGenderClass() {
				$('fieldset:not(#exgmobile-reg-page-step-gender)').removeClass('race-2 race-3').addClass('race-' + race);
				$('#exgmobile-reg-page').addClass((race == 2) ? 'as' : 'van');
				flip = $('#exgmobile-reg-page form').append('<div id="exgmobile-reg-page-flip-img" class="gender-' + race + gender + '"></div>');
			}
			
			function next(fieldset) {
				var next = fieldset.next();
				
				fieldset.hide();
				next.show();
				
				next.find('input[type="text"], input[type="email"]').focus();
			}
			
			function prev(fieldset) {
				var prev = fieldset.prev();
				
				fieldset.hide();
				
				if(prev[0].id == 'exgmobile-reg-page-step-gender') {
					setTimeout(function() {
						$('#exgmobile-reg-page').removeClass();
						$('#exgmobile-reg-page-flip-img').remove();
						prev.show();
					}, 10);
				} else {
					prev.show();
				}
			}
			
			/**
			 * Выбираем пол
			 */
			$('label.gender').on('click', function() {
				var fieldset = $(this).closest('fieldset'),
					radio = document.getElementById(this.getAttribute('for'));
					
				radio.checked = true;
				gender = radio.value.charAt(1);
				race = radio.value.charAt(0);
				setGenderClass();
				
				next(fieldset);
			});
			
			$('#exgmobile-reg-page input.next').on('click', function() {
				var fieldset = $(this).closest('fieldset');
					id = fieldset.find('input[type="text"], input[type="password"], input[type="email"]')[0].id;
				
				if (regForm.validate().element('#' + id)) {
					switch(fieldset[0].id) {
						case 'reg-step-name':
							break;
						
						default:
							break;
					}
					
					next(fieldset);
				}
			});
			
			$('#exgmobile-reg-page input.prev').on('click', function() {
				var fieldset = $(this).closest('fieldset');
				prev(fieldset);
			});
			
			$('#exgmobile-reg-page input[type="text"], input[type="email"]').on('input', function() {
				regForm.validate().element('#' + this.id);
			});
			
			$('#exgmobile-reg-page input.submit').on('click', function() {

				var fieldset = $(this).closest('fieldset');
					id = fieldset.find('input[type="text"], input[type="email"]')[0].id;
				
				if (regForm.validate().element('#' + id)) {
					return true;
				} else {
					return false;
				}
			});

			function showCustomErrors(errors) {
				if (typeof errors == 'string') {
					alert(errors);
				} else if(typeof errors == 'object') {
					var fields = ['gender', 'name', 'email', 'password'],
						first = true;
					
					$.each(fields, function(index, name) {
						var input = regForm.find('input[name="' + name + '"]');
						
						var status = $('label.status[for="' + name + '"]'),
							error = $('label.error[for="' + name + '"]');
						
						if (errors[name]) {
							regForm.validate().element('#' + name);
							
							if (first) {
								$('fieldset').hide();
								$('#reg-step-' + name).show();
								first = false;
							}
						}
					});
					
					if (errors.social) {
						$('#exgmobile-reg-page label.error[for="email"]').html(errors.social).css('display', 'block');
						
						if (first) {
							$('#exgmobile-reg-page fieldset').hide();
							$('#exgmobile-reg-page-step-email').show();
						}
					}
				}
			}
			
		  var deviceCredentials = accounts.getDeviceAccountCredentials();
		  var userData = {};

			var formOptions = {
				dataType: 'json',
				
		    url: config.host_url + '/reg.pl',

		    data: {
		      payment: app.device.platform.toLowerCase(),
		      login: deviceCredentials.login,
		      pass: deviceCredentials.pass,
		    },

			beforeSubmit: function(formData) {
		      formData.forEach(function(item) {
		        if (item.name != 'cmd') {
		          userData[item.name] = item.value;
		        }
		      });
					$('.error-container:visible').addClass('submit-loading')
					$('input.submit:visible').prop('disabled', true);
				},
				
				success: function(json) {
					$('.error-container:visible').removeClass('submit-loading');
					$('input.submit:visible').prop('disabled', false);

					if (!json.error) {
					   accounts.loginBy(accounts.add("device", deviceCredentials, userData));
					} else {
						showCustomErrors(json.error);
					}
				},
				
				error: function() {
					$('.error-container:visible').removeClass('submit-loading')
					$('input.submit:visible').prop('disabled', false);
					alert('Internal server error');
				}
			};
			
			
			regForm.validate({
				success: 'valid',
				
				rules: {
					title: {
						required: true,
						minlength: 3,
						maxlength: 20,
						remote: {
							url: config.host_url + '/reg.pl?cmd=check_name',
							type: 'post',
							data: {
								name: function() {
									return $("#exgmobile-reg-page-name").val();
								}
							}
						}
					},
				},
				
				messages: jQuery.validator.messages.regFormValidation,
				
				submitHandler: function(form) {
					$('input[name="gender"]').val(gender);
					regForm.append('<input type="hidden" name="race" value="'+race+'" />');
					regForm.ajaxSubmit(formOptions);
				},
				
				highlight: function(element, errorClass, validClass) {
					var id = element.id;
					
					$('label.status[for="' + id + '"]').removeClass('status-' + validClass).addClass('status-' + errorClass);
				},
				
				unhighlight: function(element, errorClass, validClass) {
					var id = element.id;
					
					$('label.status[for="' + id + '"]').removeClass('status-' + errorClass).addClass('status-' + validClass);
				},
				
				showErrors: function(errorMap, errorList) {
					this.defaultShowErrors();
					
					this.addWrapper( this.toShow ).css({
						display: 'block'
					});
				}
			});
				
			if (name) {
				$('#name').val(name);
				
				regForm.validate().element('#exgmobile-reg-page-name');
			}
			
			/**
			 * Проверка глобальных ошбок (от сервера)
			 */
			if (typeof errors != 'undefined') {
				showCustomErrors(errors);
			}

		}
	}

});