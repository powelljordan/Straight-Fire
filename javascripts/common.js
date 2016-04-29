// Common methods go here
$(function() {
	// var parseChild = function(name) {
	// 	if (!name) {
	// 		$("#name-present").css({display:'none'});    
	// 		$("#name-not-present").css({display: 'block'});
	// 		return;
	// 	}
	// 	name = name.charAt(0).toUpperCase() + name.slice(1);
	// 	$("#name-not-present").css({display:'none'});           
	// 	$("#name-present").css({display: 'block'}); 
	// 	$("#nav-bar-dropdown").html(name + '<span class="caret"></span>');
	// 	$("#toychest-name").text(name);
 //        $("#wishlist-name").text(name);
	// 	var found = false;
	// 	$("#wishlist-dropdown-menu li a").each(function(index,elem){
	// 		if (elem.text == name) found = true;
	// 	});
	// 	if (!found) {
	// 		$("#wishlist-dropdown-menu").append('<li><a href="#">'+name+'</a></li>');
	// 	}
	// 	$("#wishlist-dropdown").html(name+' <span class="caret"></span>');
	// };
	// $(".btn-choose-child").click(function(event){
	// 	$("#choose-child-modal").modal('show');
	// });

	// $(".child-card").click(function(event){
	// 	$("#choose-child-modal").modal('hide');
	// 	var name = event.target.parentElement.id.split('-')[1];
	// 	parseChild(name);
	// });

	// var name = location.search.split('=')[1];
	// parseChild(name);

	// JS for toy chest modal
    $('.toy-section').on('click', '.checkbox i', function() {
        var box = $(this);
        if (box.hasClass('fa-check-square-o')) {
            box.removeClass('fa-check-square-o');
            box.addClass('fa-square-o');
        } else {
            box.removeClass('fa-square-o');
            box.addClass('fa-check-square-o');
        }
    });

    var undoHtml = "<span class='undo-delete text-primary'>" +
        "<i class='fa fa-undo'></i> Undo delete</span>" +
        "<small class='pull-right dismiss-undo'>Dismiss</small>";

    $('.toy-section').on('click', '.delete-toy-btn', function() {
        var section = $(this).parents('.toy-section');
        section.attr('oldInfo', section.html());
        section.html($(undoHtml));
    });

    $('.toy-section').on('click', '.undo-delete', function() {
        var section = $(this).parents('.toy-section');
        var oldHtml = section.attr('oldInfo');
        section.html(oldHtml);
    });

    $('.toy-section').on('click', '.dismiss-undo', function() {
        var toysLeft = [];
        var section = $(this).parents('.toy-section');
        section.fadeOut({
            complete: function() {
                $(this).detach();
                toysLeft = $('.toychest-modal-body').children('.toy-section');
                if (!toysLeft.length > 0) {
                    $('#toychest-modal').modal('hide');
                }
            }
        });
    });

    $('#donate-selected-btn').click(function() {
        var selected = $('.checkbox i.fa-check-square-o');
        selected.parents('.toy-section').detach();
        $('#toychest-modal').modal('hide');
        if (selected.length) {
            alert(selected.length + " toy(s) now pending donation");
        }
    });

    $("#btn-toychest").click(function(event) {
		$("#toychest-modal").modal("show");
	});

    $('#delete-selected-btn').click(function() {
        var selected = $('.checkbox i.fa-check-square-o', '#wishlist-modal');
        selected.parents('.toy-section').detach();
        toysLeft = $('.wishlist-modal-body').children('.toy-section');
        if (!toysLeft.length) {
            $('#wishlist-modal').modal('hide');
        }
        if (selected.length) {
            alert("Removed " + selected.length + " toy(s) from wishlist");
        }
    });

    $(document).on('click', function(event) {
        if ($('#selected-child').hasClass('activated')) {
            var inChildMenu = $(event.target).parents('.col.s8').length;
            if (!inChildMenu) {
                toggleChildMenu();
            }
        }
    });

    //Code for switching children
    toggleChildMenu = function(event, switching) {
        if (switching) {
            $('.child-thumbnail').removeClass('activated');
            $('#selected-child').addClass('static');
            $('.manage-profiles-btn').hide();
            $('.menu-item').each( function () {
                $(this).velocity(
                    {opacity: "0", scaleX: ".5", scaleY: ".5", translateY: "0", translateX: '-40px'},
                    {duration: 80, delay: time});
                time += 40;
            });
            return;
        }
        var time = 0;
        if ($('#selected-child').hasClass('static')) {
            $('#selected-child').removeClass('static');
            $('.child-thumbnail').addClass('activated');
            $('.manage-profiles-btn').show();
            $('.menu-item').each( function () {
                $(this).velocity(
                    { opacity: "1", scaleX: "1", scaleY: "1", translateY: "0", translateX: '0'},
                    { duration: 80, delay: time });
                time += 40;
            });
        } else {
            $('.child-thumbnail').removeClass('activated');
            $('#selected-child').addClass('static');
            $('.menu-item').each( function () {
                $(this).velocity(
                    {opacity: "0", scaleX: ".5", scaleY: ".5", translateY: "0", translateX: '-40px'},
                    {duration: 80, delay: time});
                time += 40;
            });
        }
    };

    hideManageChildren = function() {
        $('.manage-profiles-btn').css({opacity: 0});
    };

    $('.thumbnail-overlay').click(toggleChildMenu);

    $(".manage-profiles-btn").click(function(event) {
        window.location.href = "index.html";
    });
});