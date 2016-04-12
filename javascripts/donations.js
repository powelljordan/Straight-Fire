$(function() {
	var lastDeleted;
	$('.donate-btn').tooltip({
		trigger: 'hover focus',
		title: 'Mark as donated',
		placement: 'top'
	});

	$('.donate-btn').click(function() {
		$(this).parents('.item-col').fadeOut({
			complete: function() {
				lastDeleted = $(this).addClass('item-hidden');
				$('#undo').fadeIn();
			}
		});
	});

	$('#undo').click(function() {
		if (lastDeleted) {
			lastDeleted.removeClass('item-hidden').fadeIn();
			$(this).fadeOut();
		}
	});
});