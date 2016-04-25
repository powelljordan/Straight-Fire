$(function() {
	var lastDeleted;

	var deleteAction = function() {
		var undoMessage = "";
		if ($(this).hasClass('donate')) {
			undoMessage = "Mark as donated";
		} else {
			undoMessage = "Return to toyChest";
		}
		$(this).parents('.item-col').fadeOut({
			complete: function() {
				lastDeleted = $(this).addClass('item-hidden');
				$('#donations-undo-action').text(undoMessage);
				$('#donations-undo').fadeIn();
			}
		});
	};

	$('.donate, .return').click(deleteAction);

	$('#donations-undo').click(function() {
		if (lastDeleted) {
			lastDeleted.removeClass('item-hidden').fadeIn();
			$(this).fadeOut();
		}
	});

    $('.add-toy-card').leanModal();
});