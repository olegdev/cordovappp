/***** Log view ****/

define(['jquery', 'logger', 'storage', 'views/logview/logview.tpl'], function($, logger, storage, tpl) {

	var listEl;

	logger.addListener(function(msg) {
		$(listEl).append('<tr><td>'+ msg.type +'</td><td>' + msg.text + '</td></tr>');
	});

	return {

		render: function(renderTo) {
			$(renderTo).html(tpl.apply());
			listEl = $(renderTo).find('table');

			$(renderTo).find('button[data-action="close"]').on('click', function() {
				$(renderTo).remove();
			});
			$(renderTo).find('button[data-action="expand"]').on('click', function() {
				$(renderTo).css({
					top: 0,
					height: $(document).height() - 10,
				});
			});
			$(renderTo).find('button[data-action="collapse"]').on('click', function() {
				$(renderTo).css({
					top: $(document).height() - 200 - 10,
					height: 200,
				});
			});
			$(renderTo).find('button[data-action="clear"]').on('click', function() {
				$(listEl).html('');
			});
			$(renderTo).find('button[data-action="clear_storage"]').on('click', function() {
				storage.clear();
			});
		}
	}

});