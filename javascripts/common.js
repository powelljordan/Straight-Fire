// Common methods go here
$(function() {
	var parseChild = function(name) {
		if (!name) {
			$("#name-present").css({display:'none'});    
			$("#name-not-present").css({display: 'block'});       
			return;
		}
		name = name.charAt(0).toUpperCase() + name.slice(1);
		$("#name-not-present").css({display:'none'});           
		$("#name-present").css({display: 'block'}); 
		$("#nav-bar-dropdown").text(name);
		var found = false;
		$("#wishlist-dropdown-menu li a").each(function(index,elem){
			if (elem.text == name) found = true;
		});
		if (!found) {
			$("#wishlist-dropdown-menu").append('<li><a href="#">'+name+'</a></li>');
		}
		$("#wishlist-dropdown").html(name+' <span class="caret"></span>');
	};
	$(".btn-choose-child").click(function(event){
		console.log("clicked");
		$("#choose-child-modal").modal('show');
	});

	$(".child-card").click(function(event){
		$("#choose-child-modal").modal('hide');
		var name = event.target.id.split('-')[1];
		parseChild(name);
	});

	var name = location.search.split('&')[0].split('=')[1];
	parseChild(name);

	// JS for toy chest modal
    $('.checkbox i').click(function() {
        var box = $(this);
        if (box.hasClass('fa-check-square-o')) {
            box.removeClass('fa-check-square-o');
            box.addClass('fa-square-o');
        } else {
            box.removeClass('fa-square-o');
            box.addClass('fa-check-square-o');
        }
    });

    $('.delete-toy-btn').click(function () {
       $(this).parents('.toy-section').html('Undo');
    });
});