$(function() {
	var lastDeleted;

	var baseToys = $('.items').children('.item-col');
	baseToys.each(function(index, item) {
		$('.items').append($(item).clone());
	});
	baseToys.each(function(index, item) {
		$('.items').append($(item).clone());
	});

	var deleteAction = function() {
		var undoMessage = "";
		if ($(this).hasClass('donate-btn')) {
			undoMessage = "Mark as donated";
		} else {
			undoMessage = "Return to toyChest";
		}
		$(this).parents('.item-col').fadeOut({
			complete: function() {
				lastDeleted = $(this).addClass('item-hidden');
				$('#undo-action').text(undoMessage);
				$('#undo').fadeIn();
			}
		});
	}

	$('.donate-btn, .return-to-chest').click(deleteAction);

	$('#undo').click(function() {
		if (lastDeleted) {
			lastDeleted.removeClass('item-hidden').fadeIn();
			$(this).fadeOut();
		}
	});

	$('.donate-btn').tooltip({
		trigger: 'hover focus',
		title: 'Mark as donated',
		placement: 'top'
	});
});