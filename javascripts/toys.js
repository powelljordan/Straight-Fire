$(function() {
	var lastDeleted;
	var target_url;

	var deleteAction = function() {
		var undoMessage = "";
		var tab = $(this).parents('.card')[0].id.split('-')[0];
		var item_id = $(this).parent().parent()[0].id;
		if ($(this).hasClass('donate')) {
			if (tab == 'donations') {
				undoMessage = "Mark as donated";
				removeFromDonated(item_id);
			} else if (tab == 'toychest') {
				undoMessage = "Move to donations";
				moveToDonations(item_id);
			}
		} else if ($(this).hasClass('return')) {
			if (tab == 'donations') {
				undoMessage = "Return to toyChest";
				moveToToychest(item_id);
			} else if (tab == 'toychest') {
				undoMessage = "Remove from toyChest";
				removeFromToyChest(item_id);
				// removeDisplayToyChestItem(item_id.split('-').slice(-1)[0]);
			} else if (tab == 'wishlist') {
				undoMessage = "Remove from wishlist";
				removeFromWishlist(item_id);
			}
		}
		$(this).parents('.item-col').fadeOut({
			complete: function() {
				lastDeleted = $(this).addClass('item-hidden');
				// Hide all other undo's
				$('#donations-undo').fadeOut();
				$('#toychest-undo').fadeOut();
				$('#wishlist-undo').fadeOut();
				// Set the appropriate tab's undo
				$('#'+tab+'-undo-action').text(undoMessage);
				$('#'+tab+'-undo').fadeIn();
			}
		});
	};

	var openExternalPage = function() {
		var confirmation = confirm("You will be directed to an external page to complete your transaction.");
		if (confirmation){
			open(target_url, "_blank");
		}
	}

	var shopAction = function() {
		var id = $(this).parents('.card')[0].id.split('-').splice(-1)[0];
		rootRef.child('items').child(id).on('value', function(snap){
			var specificChild = snap.val();
			target_url = specificChild.url;
			openExternalPage();
		});

	}

	// Firebase code
	var rootRef = new Firebase("https://toychest.firebaseio.com/");
	// TODO: Get child ID somehow (from URL?)
	var child_id = (location.search == '') ? "Two" : location.search.split('=')[1];
	var selected_child;
	var toychest_index;
	var donated_index;

	// Display helper functions
	var displayWishlistItem = function(item) {
		var html_str= '<div class="col s6 l2 item-col"><div id="wishlist-item-'+item.id+'" class="card toy z-depth-0"><div class="card-image">'
                       + '<img src="' + item.img_src + '">'
                       + '<span class="card-title">' + item.name + '</span></div>'
                       + '<div class="card-action">'
                       + '<i class="material-icons left-align waves-effect tooltipped shop" data-position="right" data-delay="50" data-tooltip="Purchase item">shopping_cart</i>'
                       + '<i class="material-icons right waves-effect tooltipped return" data-position="left" data-delay="50" data-tooltip="Delete from wishlist">clear</i>'
                       + '</div></div></div>';
        $("#wishlist").append(html_str);
        $("#wishlist-item-"+item.id+"> .card-action > .shop").click(shopAction);
    	$("#wishlist-item-"+item.id+"> .card-action > .return").click(deleteAction);
    	$("#wishlist-item-"+item.id+"> .card-action > .tooltipped").tooltip({'data-delay':50});
	}

	var displayToychestItem = function(item) {
		var html_str = '<div class="col s6 l2 item-col"><div id="toychest-item-'+item.id+'" class="card toy z-depth-0"><div class="card-image">'
                       + '<img src="' + item.img_src + '">'
                       + '<span class="card-title">' + item.name + '</span></div>'
                       + '<div class="card-action">'
                       + '<i class="material-icons left-align waves-effect tooltipped donate" data-position="right" data-delay="50" data-tooltip="Select to donate">local_mall</i>'
                       + '<i class="material-icons right waves-effect tooltipped return" data-position="left" data-delay="50" data-tooltip="Delete from toyChest">clear</i>'
                       + '</div></div></div>';
        	$("#toychest").append(html_str);
        	$("#toychest-item-"+item.id+"> .card-action > .donate").click(deleteAction);
        	$("#toychest-item-"+item.id+"> .card-action > .return").click(deleteAction);
        	$("#toychest-item-"+item.id+"> .card-action > .tooltipped").tooltip({'data-delay':50});
	}

	var removeDisplayToyChestItem = function(toy_id) {
		$('#toychest-item-'+toy_id).parent().remove();
	}

	var displayToychest = function(toychest) {
		for (var i = 0; i < toychest.length; i++) {
			displayToychestItem(toychest[i]);
		}
	}

	var displayDonatedItem = function(item) {
		var html_str = '<div class="col s6 l2 item-col"><div id="donations-item-'+item.id+'" class="card toy z-depth-0"><div class="card-image">'
                       + '<img src="' + item.img_src + '">'
                       + '<span class="card-title">' + item.name + '</span></div>'
                       + '<div class="card-action">'
                       + '<i class="material-icons left-align waves-effect tooltipped return" data-position="right" data-delay="50" data-tooltip="Return to toyChest">arrow_back</i>'
                       + '<i class="material-icons right waves-effect tooltipped donate" data-position="left" data-delay="50" data-tooltip="Mark as donated">check</i>'
                       + '</div></div></div>';
        	$("#donations").append(html_str);
        	$("#donations-item-"+item.id+"> .card-action > .donate").click(deleteAction);
        	$("#donations-item-"+item.id+"> .card-action > .return").click(deleteAction);
        	$("#donations-item-"+item.id+"> .card-action > .tooltipped").tooltip({'data-delay':50});
	}

	removeDisplayDonatedItem = function(toy_id) {
		$('#donations-item-'+toy_id).parent().remove();
	}

	var displayDonated = function(donated) {
		for (var i = 0; i < donated.length; i++) {
			displayDonatedItem(donated[i]);
		}
	}

	// Firebase (backend) helper functions
	var findIndexById = function(toy_id, arr) {
		var index = -1;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].id == toy_id) {
				index = i;
				break;
			}
		}
		return index;
	}

	var removeFromDonated = function(id) {
		var toy_id = id.split('-').slice(-1)[0];
		var index = findIndexById(toy_id, selected_child.donated);
		if (index != -1) {
			selected_child.donated.splice(index, 1);
			rootRef.child('children').child(selected_child.id).child('donated').set(selected_child.donated);		
		}
	}

	var removeFromToyChest = function(id) {
		var toy_id = id.split('-').slice(-1)[0];
		var index = findIndexById(toy_id, selected_child.toyChest);
		if (index != -1) {
			selected_child.toyChest.splice(index, 1);
			rootRef.child('children').child(selected_child.id).child('toyChest').set(selected_child.toyChest);		
		}
	}

	var removeFromWishlist = function(id) {
		var item_id = id.split('-').slice(-1)[0];
		var arr = selected_child.wishlist;
		var index = -1;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == item_id) {
				index = i;
				break;
			}
		}
		if (index != -1) {
			selected_child.wishlist.splice(index, 1);
			rootRef.child('children').child(selected_child.id).child('wishlist').set(selected_child.wishlist);		
		}
	}

	var addToToychest = function(toy_name, img_src) {
		toychest_index += 1;
		var index = toychest_index;
		var new_toy = {id: index, name: toy_name, img_src: img_src};
		selected_child.toyChest.push(new_toy);
		rootRef.child('children').child(selected_child.id).child('toyChest').set(selected_child.toyChest);
		return index;
	}

	var addToWishlist = function(id) {
		selected_child.wishlist.push(parseInt(id));
		rootRef.child('children').child(selected_child.id).child('wishlist').set(selected_child.wishlist);
	}

	var addToDonated = function(toy_name, img_src) {
		donated_index += 1;
		var index = donated_index;
		var new_toy = {id: index, name: toy_name, img_src: img_src};
		selected_child.donated.push({id: index, name: toy_name, img_src: img_src});
		rootRef.child('children').child(selected_child.id).child('donated').set(selected_child.donated);
		return index;
	}

	var moveToToychest = function(id, display = true) {
		var toy_id = id.split('-').slice(-1)[0];
		var index = findIndexById(toy_id, selected_child.donated);
		var toy_name = selected_child.donated[index].name;
		var toy_img_src = selected_child.donated[index].img_src;
		removeFromDonated(id);
		var new_toy_id = addToToychest(toy_name, toy_img_src);
		if (display) {
			displayToychestItem({id: new_toy_id, name:toy_name, img_src: toy_img_src});
		}
		return new_toy_id;
	}

	var moveToDonations = function(id, display = true) {
		var toy_id = id.split('-').slice(-1)[0];
		var index = findIndexById(toy_id, selected_child.toyChest);
		var toy_name = selected_child.toyChest[index].name;
		var toy_img_src = selected_child.toyChest[index].img_src;
		removeFromToyChest(id);
		var new_toy_id = addToDonated(toy_name, toy_img_src);
		if (display) {
			displayDonatedItem({id: new_toy_id, name:toy_name, img_src: toy_img_src});
		}
		return new_toy_id;
	}

	var updateChildParams = function(child) {
		// Update the header to display selected child
		$("#selected-child img").attr('src',child.img_src);
		$("#selected-child .child-name").text(child.name);
	};

    // Child header - Switching child functionality
    var clearChildSpecificFields = function() {
    	$('.inactive-child').remove();
    	$('.item-col').remove();
    }

    var switchChild = function(child_id) {
    	child_id = child_id;
    	clearChildSpecificFields();
    	var child;
    	for (var i = 0; i < children.length; i++) {
    		child = children[i];
    		if (children[i].id == child_id) {
    			selected_child = child;
				toychest_index = child.toyChest[child.toyChest.length-1].id;
				donated_index = child.donated[child.donated.length-1].id;
				updateChildParams(child);
				loadAndDisplayChildInfo(child);
			} else {
				displayInactiveChild(child);
    		}
    	}
    }

    var bindInactiveChild = function() {
	    $('.inactive-child').click(function(event) {
	    	var child_id = event.toElement.id.split('-')[1];
	    	toggleChildMenu();
	    	switchChild(child_id);
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
    
	var loadAndDisplayChildInfo = function(c) {
		for (var i = 0; i < c.wishlist.length; i++) {
			rootRef.child('items').child(c.wishlist[i]).on('value', function(snap){
				var item = snap.val();
				displayWishlistItem(item);
			});
		}
		displayToychest(c.toyChest);
		displayDonated(c.donated);
	};

    $('.shop').hover(function(){$('.shop').addClass('shop-hover')}, function(){$('.shop').removeClass('shop-hover') });

	// Load all children
	var children = [];
	rootRef.child("children").on("child_added", function(snapshot){
		var child = snapshot.val();
		children.push(child);
		// If child the selected child, update the page
		if (child.id == child_id) {
			selected_child = child;
			toychest_index = child.toyChest[child.toyChest.length-1].id;
			donated_index = child.donated[child.donated.length-1].id;
			updateChildParams(child);
			loadAndDisplayChildInfo(child);
		} else {
			displayInactiveChild(child);
		}
	});

	$('.donate, .return').click(deleteAction);

	$('#donations-undo').click(function() {
		if (lastDeleted) {
			lastDeleted.removeClass('item-hidden').fadeIn();
			$(this).fadeOut();
			var id = lastDeleted[0].getElementsByClassName("card")[0].id;
			var img_src = $("#"+id+" > .card-image > img").attr("src");
			var toy_name = $("#"+id+" > .card-image > .card-title").text();
			var donations_id = id.split('-').slice(-1)[0];
			var index;
			var toychest_id = toychest_index; // Last item is undo item
			if ($(this).text().split(' ').splice(-1)[0] == "donated'") {
				// Add back to donated list
				index = addToDonated(toy_name, img_src, donations_id);
			} else {
				// Move from toychest to donated
				index = moveToDonations("#toychest-item-"+toychest_id, false);
				removeDisplayToyChestItem(toychest_id);
			}
			$("#"+lastDeleted[0].children[0].id).attr('id', 'donations-item-'+index);
		}
	});

	$('#toychest-undo').click(function() {
		if (lastDeleted) {
			lastDeleted.removeClass('item-hidden').fadeIn();
			$(this).fadeOut();
			var id = lastDeleted[0].getElementsByClassName("card")[0].id;
			var img_src = $("#"+id+" > .card-image > img").attr("src");
			var toy_name = $("#"+id+" > .card-image > .card-title").text();
			var toychest_toy_id = id.split('-').splice(-1)[0];
			var donations_toy_id = donated_index; // Last item in donated list is the undo toy
			var index;
			if ($(this).text().split(' ').splice(-1)[0] == "donations'") {
				// Move from donations list back to toychest
				index = moveToToychest("#donations-item-"+donations_toy_id, false);
				removeDisplayDonatedItem(donations_toy_id);
			} else {
				// Add back to toychest
				index = addToToychest(toy_name, img_src, toychest_toy_id);
			}
			$("#"+lastDeleted[0].children[0].id).attr('id', 'toychest-item-'+index);
		}
	});

	$("#wishlist-undo").click(function() {
		if (lastDeleted) {
			lastDeleted.removeClass('item-hidden').fadeIn();
			$(this).fadeOut();
			var id = lastDeleted[0].getElementsByClassName('card')[0].id;
			var toy_id = id.split('-').splice(-1)[0];
			addToWishlist(toy_id);
		}
	});

    $('.add-toy-card').leanModal();

    $(".shop").click(function(event) {
    	window.location.href = "shopping.html?id=" + child_id;
    });

    $("#add-toy-form").submit(function(event) {
    	event.preventDefault();
    	var toy_name = $("#toy-name").val();
    	// tODO: how to get image?
    	// var img_src = 
    })


});