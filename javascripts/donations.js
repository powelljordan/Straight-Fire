$(function() {
	var lastDeleted;

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
	};

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

    var john = {id: "One",
        name: "John",
        age: 13,
        budget: 50,
        toyChest: ["Dinosaur", "Gameboy", "Lego", "Racecar", "Cards"]
    };

    var david = {id: "Two",
        name: "David",
        age:8,
        budget: 50,
        toyChest: ["Connect 4", "Chess", "Book", "Xbox", "Wii"]
    };

    var children = [john, david];

    children.forEach(function(child) {

        $("#toyChestModal").append(
            '<div class = "thumbnail col-md-6 col-sm-6">'+
            '<h3 class="text-center">'+child.name+'</h3>'+
            '<ul id="'+child.id+'toyChest" class = "list-group checked-list-box">'+
            '</ul></div>'
        );

        child.toyChest.forEach(function (toyName) {


            $("#" + child.id + "toyChest").append(
                '<div class="col-md-12 col-sm-12 toy-section">' +
                '<div class="col-md-3 col-sm-3 col check-column">' +
                '<p class="checkbox"><i class="fa fa-square-o"></i></p>' +
                '</div>' +
                '<div class="col-md-6 col-sm-6 col"><h3>' + toyName + '</h3></div>' +
                '<div class="col-md-3 col-sm-3 col"><img src="../images/' + toyName + '.jpg" class="toy-image center-block"></div>' +
                '</div>'
            );
        });
    });
});