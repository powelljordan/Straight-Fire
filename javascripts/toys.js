$(function() {
	var lastDeleted;

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

	// Firebase code
	var rootRef = new Firebase("https://toychest.firebaseio.com/");
	// TODO: Get child ID somehow (from URL?)
	var child_id = "Two";
	var selected_child;
	var toychest_index;
	var donated_index;

	// Display helper functions
	var displayWishlistItem = function(item) {
		var html_str= '<div class="col s6 l2 item-col"><div id="wishlist-item-'+item.id+'" class="card toy z-depth-0"><div class="card-image">'
                       + '<img src="' + item.img_src + '">'
                       + '<span class="card-title">' + item.name + '</span></div>'
                       + '<div class="card-action">'
                       + '</div></div></div>';
        $("#wishlist").append(html_str);
	}

	var displayToychestItem = function(item) {
		var html_str = '<div class="col s6 l2 item-col"><div id="toychest-item-'+item.id+'" class="card toy z-depth-0"><div class="card-image">'
                       + '<img src="' + item.img_src + '">'
                       + '<span class="card-title">' + item.name + '</span></div>'
                       + '<div class="card-action">'
                       + '<i class="material-icons left-align waves-effect tooltipped donate" data-position="right" data-delay="50" data-tooltip="Select to donate">local_mall</i>'
                       + '<i class="material-icons right waves-effect tooltipped return" data-position="left" data-delay="50" data-tooltip="Delete">clear</i>'
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
		var index = selected_child.wishlist.indexOf(item_id);
		if (index != -1) {
			selected_child.wishlist.splice(index, 1);
			rootRef.child('children').child(selected_child.id).child('wishlist').set(selected_child.wishlist);		
		}
	}

	var addToToychest = function(toy_name, img_src, id = -1) {
		toychest_index += 1;
		var index = toychest_index;
		var new_toy = {id: index, name: toy_name, img_src: img_src};
		selected_child.toyChest.push(new_toy);
		rootRef.child('children').child(selected_child.id).child('toyChest').set(selected_child.toyChest);
		return index;
	}

	var addToDonated = function(toy_name, img_src, id = -1) {
		donated_index += 1;
		var index = donated_index;
		var new_toy = {id: index, name: toy_name, img_src: img_src};
		selected_child.donated.push({id: index, name: toy_name, img_src: img_src});
		rootRef.child('children').child(selected_child.id).child('donated').set(selected_child.donated);
		return index;
	}

	var moveToToychest = function(id, display = true, toychest_id = -1) {
		var toy_id = id.split('-').slice(-1)[0];
		var index = findIndexById(toy_id, selected_child.donated);
		var toy_name = selected_child.donated[index].name;
		var toy_img_src = selected_child.donated[index].img_src;
		removeFromDonated(id);
		var new_toy_id = addToToychest(toy_name, toy_img_src, toychest_id);
		if (display) {
			displayToychestItem({id: new_toy_id, name:toy_name, img_src: toy_img_src});
		}
	}

	var moveToDonations = function(id, display = true, donated_id = -1) {
		var toy_id = id.split('-').slice(-1)[0];
		var index = findIndexById(toy_id, selected_child.toyChest);
		var toy_name = selected_child.toyChest[index].name;
		var toy_img_src = selected_child.toyChest[index].img_src;
		removeFromToyChest(id);
		var new_toy_id = addToDonated(toy_name, toy_img_src, donated_id);
		if (display) {
			displayDonatedItem({id: new_toy_id, name:toy_name, img_src: toy_img_src});
		}
	}

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
			toychest_index = child.toyChest[child.toyChest.length-1].id;
			donated_index = child.donated[child.donated.length-1].id;
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
			var id = lastDeleted[0].getElementsByClassName("card")[0].id;
			var img_src = $("#"+id+" > .card-image > img").attr("src");
			var toy_name = $("#"+id+" > .card-image > .card-title").text();
			var donations_id = id.split('-').slice(-1)[0];
			var toychest_id = toychest_index; // Last item is undo item
			if ($(this).text().split(' ').splice(-1)[0] == "donated'") {
				// Add back to donated list
				addToDonated(toy_name, img_src, donations_id);
			} else {
				// Move from toychest to donated
				moveToDonations("#toychest-item-"+toychest_id, false, donations_id);
				removeDisplayToyChestItem(toychest_id);
			}
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
			if ($(this).text().split(' ').splice(-1)[0] == "donations'") {
				// Move from donations list back to toychest
				moveToToychest("#donations-item-"+donations_toy_id, false, toychest_toy_id);
				removeDisplayDonatedItem(donations_toy_id);
			} else {
				// Add back to toychest
				addToToychest(toy_name, img_src, toychest_toy_id);
			}
		}
	});

    $('.add-toy-card').leanModal();

    $(".shop").click(function(event) {
    	window.location.href = "shopping.html";
    });

    $("#add-toy-form").submit(function(event) {
    	event.preventDefault();
    	var toy_name = $("#toy-name").val();
    	// tODO: how to get image?
    	// var img_src = 
    })


});