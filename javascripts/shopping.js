// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	var rootRef = new Firebase("https://toychest.firebaseio.com/");
	var selected_child;
	var data = [];
	var activeFilters = [];
	var userFilters = [];
	var display_item = function(d, i) {
		var row_num = Math.floor(i/5);
		if (i%5 == 0) {
			$("#search-content").append("<div class='row' id='row-"+ row_num + "'></div>");
		}
		if (i%5 == 0) {
			var div_text = '<div id="item-wrapper-'+d.id+'" class="col m2 offset-m1"><div class="card item-card">';
		} else {
			var div_text = '<div id="item-wrapper-'+d.id+'" class="col m2"><div class="card item-card">';
		}
	    
	    var img_text = '<div class="card-image"> <img src="'+d.img_src+'"></div>';
	    var name = (d.name.length > 45) ? d.name.substring(0,42)+"..." : d.name;
	    var caption_text = '<div class="card-action">' + "<span class='seller'>"+ d.seller + "</span><span class='item-name'>"+name+'</span></div>';
	    var str = div_text + img_text + caption_text + '</div>';
		$("#row-"+row_num).append(str);
		bind_modal("#item-wrapper-"+d.id);
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
			if (!child.toyChest) {
				selected_child.toyChest = [];
			}
			if (!child.wishlist) {
				selected_child.wishlist = [];
			}
			if (!child.donated) {
				selected_child.donated = [];
			}
			updateChildParams(child);
			updateResults();
		} else {
			displayInactiveChild(child);
		}
	});

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
			$("#interests-wrapper").append("<div class='chip interest-btn selected' id='"+ i + "-interest'><i class='fa fa-tag left interest-btn-icon'></i><span class='unselectable'>"+child.interests[i]+"</span></div>");
			activeFilters.push(child.interests[i].toLowerCase());
		}
		$(".interest-btn").click(function(event) {
			// If filter is selected, remove the selected class
			if ($.inArray('selected', event.toElement.classList) != -1) {
				$("#"+event.toElement.id).removeClass('selected');
				remove_filter($(event.target).find("span").text());
				// TODO: call updateShoppingResults();
			} else {
				$("#"+event.toElement.id).addClass('selected');
				add_new_filter($(event.target).find("span").text());
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
            var c_id = event.toElement.id.split('-')[1];
            toggleChildMenu(null, true);
            switchChild(c_id);
        });
    }

	var clearChildSpecificFields = function() {
		$('.inactive-child').remove();
		$('.interest-btn').remove();
	}

	var switchChild = function(c_id) {
		activeFilters = [];
		child_id = c_id;
		clearChildSpecificFields();
		var child;
		for (var i = 0; i < children.length; i++) {
			child = children[i];
			if (child.id == c_id) {
				selected_child = child;
				updateChildParams(child);
			} else {
				displayInactiveChild(child);
			}
		}
	}

	var updateChildParams = function(child) {
		activeFilters = [];
		fillInterests(child);
		updateResults();
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
			$(".item-title").text(elem.find(".card-action > .item-name").text());
			$("#modal-price").text("$"+data[index].price);
			$("#seller").text(data[index].seller);
			(data[index].description.length < 200) ? $("#description").text(data[index].description) : $("#description").html(data[index].description.slice(0,200) 
				// + "... <a href='" + data[index].url + "' target='_blank'>Read more</a>");
				+ "... <a id='btn-read-more' href='#'>Read more</a>");
			bindReadMoreBtn();
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
			$("#modal-buttons").data("name", data[index].name);
			$("#myModal").data("index", index);

			if ($.inArray(index, selected_child.wishlist) != -1) {
				$("#btn-wishlist").text("Remove from wishlist");
				// $("#btn-wishlist").addClass("z-depth-0");
				$("#btn-wishlist").addClass("disabled-btn");
			} else {
				$("#btn-wishlist").text("Add to wishlist");
				// $("#btn-wishlist").removeClass("z-depth-0");
				$("#btn-wishlist").removeClass("disabled-btn");
			}

			$("#rating-number").text(data[index].rating+"/5");
			fillStars(data[index].rating);
		});
	}

	$("#modal-close").click(function(e) {
		$("#myModal").closeModal();
	})

	var purchase_state = false;
	var details_state = false;

	var purchaseConfirm = function() {
		purchase_state = true;
		$("#btn-continue").text("Ok");
		$("#continue-desc").text($("#modal-buttons").data("name") + " has been moved to " + selected_child.name + "'s toyChest.");
		$("#btn-cancel").css({"display":"None"});
	}

	$("#btn-purchase").click(function(event) {
		// openExternalPage();
		$("#continue-desc").text('You will be directed to an external page to complete your transaction.');
		$("#btn-cancel").css({"display":"block"});
		$("#btn-continue").text("Continue");
		$("#confirm-modal").openModal();
	});

	var moveToToychest = function(id) {
		var index = -1;
		for (var i = 0; i < data.length; i++) {
			if (data[i].id == id) {
				index = i;
				break;
			}
		}
		var new_item = {name: data[index].name, img_src: data[index].img_src, id: selected_child.toyChest.length};
		selected_child.toyChest.push(new_item);
		rootRef.child('children').child(selected_child.id).child('toyChest').set(selected_child.toyChest);
	}

	$("#btn-continue").click(function(event) {
		if (details_state) {
			details_state = false;
			$("#confirm-modal").closeModal();
			open($("#modal-buttons").data().url, "_blank");
			return;
		}
		if (!purchase_state) {
			open($("#modal-buttons").data().url, "_blank");
			moveToToychest($("#modal-buttons").data("id"));
			purchaseConfirm();
		} else {
			$("#confirm-modal").closeModal();
			purchase_state = false;
		}
	});

	$("#btn-cancel").click(function(event) {
		$("#confirm-modal").closeModal();
		details_state = false;
	});

	var bindReadMoreBtn = function() {
		$("#btn-read-more").click(function(event) {
			$("#continue-desc").text('You will be directed to an external page for the full description.');
			$("#confirm-modal").openModal();
			details_state = true;
		});
	}

	$("#btn-wishlist").click(function(event) {
		var item_id = $("#modal-buttons").data().id;
		var wishlist = (selected_child.wishlist == undefined) ? [] : selected_child.wishlist;
		if ($(this).hasClass('disabled-btn')) {
			// Remove from wishlist
			wishlist.splice(wishlist.indexOf(item_id), 1);
			rootRef.child('children').child(selected_child.id).child('wishlist').set(wishlist);
			// $("#btn-wishlist").removeClass("z-depth-0");
			$("#btn-wishlist").text("Add to wishlist");
			$("#btn-wishlist").removeClass("disabled-btn");
			Materialize.toast ("Item has been removed from wishlist", 3000);
		} else {
			// Add to wishlist
			wishlist.push(item_id);
			rootRef.child('children').child(selected_child.id).child('wishlist').set(wishlist);
			// $("#btn-wishlist").addClass("z-depth-0");
			$("#btn-wishlist").text("Remove from wishlist");
			$("#btn-wishlist").addClass("disabled-btn");
			Materialize.toast ("Item has been added to wishlist", 3000);
		}
	});

	// Go back to toychest view
	$(".back").click(function(event) {
		window.location.href = "toys.html?id=" + child_id;
	});

	var updateResults = function(){
		$("#search-content").html("");
		var loadResults = function(results){
			var i = 0;
			results.forEach(function(result, index){
				display_item(result, i);
				i++;
			});
		}
		mergeResults(activeFilters, loadResults)

	}

	var display_new_filter = function(filter) {
		var id = userFilters.length;
		userFilters[id] = filter;
		var html_str = '<div id="'+id+'-filter" class="chip filter-btn"><span class="unselectable">'
					+filter+'</span><i class="material-icons">close</i></div>';
		$('#filters-wrapper').append(html_str);
		bindFilterRemove('#'+id+'-filter > .material-icons');
	}

	var add_new_filter = function(filter) {
		activeFilters.push(filter.toLowerCase());
		updateResults();
	}

	var remove_filter = function(filter){
		activeFilters.splice(activeFilters.indexOf(filter.toLowerCase()), 1);
		updateResults();
	}

	$("#btn-add-filter").click(function(event) {
		var new_filter = $("#search").val();
		if (new_filter == '') return;
		add_new_filter(new_filter);
		display_new_filter(new_filter);
		$("#search").val("");
	});

	var bindFilterRemove = function(id) {
		$(id).click(function(event) {
			var filter_id = parseInt($(this)[0].parentElement.id.split('-')[0]);
			var filter = userFilters[filter_id];
			remove_filter(filter);
		});
	}

	$("#search").keypress(function(e) {
		if (e.which == 13) {
			var new_filter = $("#search").val();
			if (new_filter == '') return;
			add_new_filter(new_filter);
			display_new_filter(new_filter);
			$("#search").val("");
		}
	})

	$('.back').hover(function(){$('.back').addClass('back-hover')}, function(){$('.back').removeClass('back-hover') });


	/**
		Passes a list items that have the given tag to the callback function
	*/
	var queryForTag = function(tag, addToResults, last){
		var matchedItems = [];
		rootRef.child("items")
			.on("value", function(snap){
				snap.val().forEach(function(item, index, array){
					if(item.tags){
						if(item.tags[tag]){
							matchedItems.push(item);				
						}
					}
					if(index === array.length - 1){
						addToResults(matchedItems, last);
					}
				});
			});
	}

	/**
		Merges results of multi tag filter. Takes a list of tags to search for as an argument
	*/
	var mergeResults = function(tags, loadResults){
		var results = [];
		var addToResults = function(matches, last){
			if (matches.length == 0 && last) {
				loadResults(results);
			}
			matches.forEach(function(match, ind, matches){
				if(!results[match.id]){
					results[match.id] = match;
				}
				if(last && ind === matches.length - 1){
					loadResults(results);
				}
			});
		}
		tags.forEach(function(tag, ind, tags){
			last = (ind == tags.length-1) ? true : false;
			queryForTag(tag, addToResults, last);
		});
	}
	
});