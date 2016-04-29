// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	var rootRef = new Firebase("https://toychest.firebaseio.com/");
	var selected_child;
	var data = [];
	var display_item = function(d, i) {
		var row_num = Math.floor(i/4);
		if (i%4 == 0) {
			$("#search-content").append("<div class='row' id='row-"+ row_num + "'></div>");
		}
	    var div_text = '<div id="item-wrapper-'+i+'" class="col m3"><div class="card item-card">';
	    var img_text = '<div class="card-image"> <img src="'+d.img_src+'"></div>';
	    var caption_text = '<div class="card-action">'+d.name+'</div>';
	    var str = div_text + img_text + caption_text + '</div>';
		$("#row-"+row_num).append(str);
		bind_modal("#item-wrapper-"+i);
	};

	var item_index = 0;
	rootRef.child("items").on("child_added", function(snapshot){
		var item = snapshot.val();
		data.push(item);
		display_item(item, item_index);
		item_index += 1;
	});

	// TODO: get child index
	var child_id = (location.search == '') ? "Two" : location.search.split('=')[1];

	var children = [];
	rootRef.child("children").on("child_added", function(snapshot){
		var child = snapshot.val();
		children.push(child);
		if (child.id == child_id) {
			selected_child = child;
			updateChildParams(child);
		} else {
			displayInactiveChild(child);
		}
	});

	var openExternalPage = function() {
		var confirmation = confirm("You will be directed to an external page to complete your transaction.");
		if (confirmation){
			open($("#modal-buttons").data().url, "_blank");
		}
	}
	var resetWidths = function() {
		$(".shaded-star").each(function(index, elem) {
			$(this).css({width:24})
		});
	}

	var fillStars = function(rating) {
		$(".shaded-star").each(function(index, elem) {
			$(this).removeClass('filled');
			$(this).addClass('unused-star');
		});
		resetWidths();
		var num_full_stars = Math.floor(rating);
		for (var i = 0; i < num_full_stars; i++) {
			$("#shaded-star-"+i).removeClass('unused-star');
			$("#shaded-star-"+i).addClass('filled');
			resetWidths();
		}
		if (num_full_stars < 5 && num_full_stars != rating) {
			var ratio_width = (rating - num_full_stars)*24.0;
			$("#shaded-star-"+num_full_stars).removeClass('unused-star');
			$("#shaded-star-"+num_full_stars).addClass('half-star');
			$("#shaded-star-"+num_full_stars).css({width:ratio_width});
		}
	}

	var fillInterests = function(child) {
		if (!child.interests) {
			return;
		}
		for (var i = 0; i < child.interests.length; i++) {
			$("#filters-wrapper").append("<a class='chip filter-btn selected' id='"+ i + "-filter'><i class='fa fa-tag left filter-btn-icon'></i>"+child.interests[i]+"</div>");
		}
		// TODO: actually filter
		$(".filter-btn").click(function(event) {
			// If filter is selected, remove the selected class
			if ($.inArray('selected', event.toElement.classList) != -1) {
				$("#"+event.toElement.id).removeClass('selected');
				// TODO: call updateShoppingResults();
			} else {
				$("#"+event.toElement.id).addClass('selected');
			}
		});
	}

    var displayInactiveChild = function(child) {
        var html_str = '<div id=child-' + child.id + ' class="child-thumbnail inactive-child menu-item valign">'
            + '<img src="'+ child.img_src + '" class="responsive-img child-image">'
            + '<span class="child-name">'+ child.name + '</span>'
            + '</div>';
        $("#child-header > .col > #selected-child").after(html_str);
        bindInactiveChild();
    };
    var bindInactiveChild = function() {
        $('.inactive-child').click(function(event) {
            var child_id = event.toElement.id.split('-')[1];
            toggleChildMenu(null, true);
            switchChild(child_id);
        });
    }

	var clearChildSpecificFields = function() {
		$('.inactive-child').remove();
		$('.filter-btn').remove();
	}

	var switchChild = function(child_id) {
		child_id = child_id;
		clearChildSpecificFields();
		var child;
		for (var i = 0; i < children.length; i++) {
			child = children[i];
			if (child.id == child_id) {
				selected_child = child;
				updateChildParams(child);
			} else {
				displayInactiveChild(child);
			}
		}
	}

	var updateChildParams = function(child) {
		fillInterests(child);
		// Update the header to display selected child
		$("#selected-child img").attr('src',child.img_src);
		$("#selected-child .child-name").text(child.name);
	}

	// When an item is clicked, populate modal with item's info
	var bind_modal = function(id) {
		// $(".item-card").click(function(event) {
		$(id).click(function(event) {
			$("#myModal").openModal();
			var index = parseInt(event.toElement.parentElement.id.split("-")[2]);
			var elem = $("#"+event.toElement.parentElement.id);
			var src = elem.find(".card").find(".card-image").find("img").attr("src");
			$("#modal-thumbnail").html("<img class='responsive-img' src='" + src +"'/>");
			$(".item-title").text(elem.find(".card-action").text());
			$("#modal-price").text("$"+data[index].price);
			$("#seller").text(data[index].seller);
			(data[index].description.length < 200) ? $("#description").text(data[index].description) : $("#description").html(data[index].description.slice(0,200) + "... <a href='" + data[index].url + "' target='_blank'>Read more</a>");
			$("#age").text(data[index].age);
			var reviews = data[index].reviews;
			var reviews_str = "";
			for (var i = 0; i < reviews.length; i++) {
				reviews_str += '<div id="review-' + i + '" class="review">';
				reviews_str += '<div class="review-header"> <div class="review-summary">' + reviews[i].summary + '</div>';
				reviews_str += '<span class="review-author subtext">' + reviews[i].author + '</span>';
				reviews_str += '<span class="review-rating subtext">Rating: ' + reviews[i].rating + '/5</span></div>';
				reviews_str += '<div class="review-content">' + reviews[i].content + '</div></div><hr>';
			}
			$("#reviews-body").html(reviews_str);
			$("#modal-buttons").data("url", data[index].url);
			$("#modal-buttons").data("id", data[index].id);
			$("#myModal").data("index", index);

			if ($.inArray(index, selected_child.wishlist) != -1) {
				$("#btn-wishlist").prop("disabled",true);
				$("#btn-wishlist").addClass("z-depth-0");
				$("#btn-wishlist").addClass("disabled-btn");
			} else {
				$("#btn-wishlist").prop("disabled",false);
				$("#btn-wishlist").removeClass("z-depth-0");
				$("#btn-wishlist").removeClass("disabled-btn");
			}

			$("#rating-number").text(data[index].rating+"/5");
			fillStars(data[index].rating);
		});
	}

	$("#modal-close").click(function(e) {
		$("#myModal").closeModal();
	})

	$("#btn-purchase").click(function(event) {
		openExternalPage();
	});

	$("#btn-wishlist").click(function(event) {
		var item_id = $("#modal-buttons").data().id;
		var wishlist = selected_child.wishlist;
		wishlist.push(item_id);
		rootRef.child('children').child(selected_child.id).child('wishlist').set(wishlist);
		$("#btn-wishlist").prop("disabled",true);
		$("#btn-wishlist").addClass("z-depth-0");
		$("#btn-wishlist").addClass("disabled-btn");
	});

	// Go back to toychest view
	$(".back").click(function(event) {
		window.location.href = "toys.html?id=" + child_id;
	});
	// Autocomplete
	var availableTags = [
		'Star Wars',
		'Arts & Crafts',
		'Water colors',
		'paint',
		'painting',
		'LEGOs',
		'action figures'
	];

	$( "#search" ).autocomplete({
      source: availableTags
    });

	$('.back').hover(function(){$('.back').addClass('back-hover')}, function(){$('.back').removeClass('back-hover') });
          
	// // Code from: http://miles-by-motorcycle.com/fv-b-8-670/stacking-bootstrap-dialogs-using-event-callbacks
	// $('.modal').on('hidden.bs.modal', function(event) {
 //        $(this).removeClass( 'fv-modal-stack' );
 //        $('body').data( 'fv_open_modals', $('body').data( 'fv_open_modals' ) - 1 );
 //    });

	// $( '.modal' ).on('shown.bs.modal', function(event) {  
 //    	// keep track of the number of open modals
 //    	if (typeof( $('body').data('fv_open_modals')) == 'undefined') {
 //        	$('body').data( 'fv_open_modals', 0 );
 //       	}       
	// 	// if the z-index of this modal has been set, ignore.
 //    	if ($(this).hasClass('fv-modal-stack')) {
 //            return;
 //        } 
 //    	$(this).addClass('fv-modal-stack');
 //    	$('body').data( 'fv_open_modals', $('body').data('fv_open_modals') + 1 );
 //    	$(this).css('z-index', 1040 + (10 * $('body').data('fv_open_modals')));
 //    	$('.modal-backdrop').not( '.fv-modal-stack' )
 //            .css('z-index', 1039 + (10 * $('body').data('fv_open_modals')));
 //    	$('.modal-backdrop').not('fv-modal-stack')
 //            .addClass('fv-modal-stack'); 
 //     });
	
});