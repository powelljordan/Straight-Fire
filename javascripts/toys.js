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

	// Firebase code
	var rootRef = new Firebase("https://toychest.firebaseio.com/");
	// TODO: Get child ID somehow (from URL?)
	var child_id = "Two";
	var selected_child;

	var updateChildParams = function(child) {
		// Update the header to display selected child
		$("#selected-child img").attr('src',child.img_src);
		$("#selected-child .child-name").text(child.name);
	}

	var displayChild = function(child) {
		var html_str = '<div class="col s2 valign-wrapper" style="display: none;">'+
		'<div class="child-thumbnail valign"><img src="'+child.img_src+'" class="responsive-img child-image">'+
		'<span class="child-name">'+child.name+'</span></div></div>';
		$("#child-header").append(html_str);
	}

	var displayWishlistItem = function(item) {
		var html_str= '<div class="col s6 l2"><div id="wishlist-item-'+item.id+'" class="card toy z-depth-0"><div class="card-image">'
                       + '<img src="' + item.img_src + '">'
                       + '<span class="card-title">' + item.name + '</span></div>'
                       + '<div class="card-action">'
                       + '</div></div></div>';
        $("#wishlist").append(html_str);
	}

	var displayToychest = function(toychest) {
		var html_str;
		for (var i = 0; i < toychest.length; i++) {
			html_str = '<div class="col s6 l2"><div id="toychest-item-'+toychest[i].name+'" class="card toy z-depth-0"><div class="card-image">'
                       + '<img src="' + toychest[i].img_src + '">'
                       + '<span class="card-title">' + toychest[i].name + '</span></div>'
                       + '<div class="card-action">'
                       + '</div></div></div>';
        	$("#toychest").append(html_str);
		}
	}

	var displayDonated = function(donated) {
		var html_str;
		for (var i = 0; i < donated.length; i++) {
			html_str = '<div class="col s6 l2"><div id="toychest-item-'+donated[i].name+'" class="card toy z-depth-0"><div class="card-image">'
                       + '<img src="' + donated[i].img_src + '">'
                       + '<span class="card-title">' + donated[i].name + '</span></div>'
                       + '<div class="card-action">'
                       + '</div></div></div>';
        	$("#donations").append(html_str);
		}
	}

	var loadAndDisplayChildInfo = function(c) {
		for (var i = 0; i < c.wishlist.length; i++) {
			rootRef.child('items').child(c.wishlist[i]).on('value', function(snap){
				var item = snap.val();
				displayWishlistItem(item);
			});
		}
		displayToychest(c.toyChest);
		displayDonated(c.donated);
	}

	// Load all children
	var children = [];
	rootRef.child("children").on("child_added", function(snapshot){
		var child = snapshot.val();
		children.push(child);
		// If child the selected child, update the page
		if (child.id == child_id) {
			selected_child = child;
			updateChildParams(child);
			loadAndDisplayChildInfo(child);
		} else {
			displayChild(child);
		}
	});

	$('.donate, .return').click(deleteAction);

	$('#donations-undo').click(function() {
		if (lastDeleted) {
			lastDeleted.removeClass('item-hidden').fadeIn();
			$(this).fadeOut();
		}
	});

    $('.add-toy-card').leanModal();


});