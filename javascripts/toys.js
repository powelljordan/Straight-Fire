$(function() {
	var lastDeleted;

	var deleteAction = function() {
		var undoMessage = "";
		if ($(this).hasClass('donate')) {
			undoMessage = "Mark as donated";
			removeFromDonated($(this).parent().parent()[0].id);
		} else {
			undoMessage = "Return to toyChest";
			moveToToychest($(this).parent().parent()[0].id);
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

	var findIndexByName = function(toy_name, arr) {
		var index = -1;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].name == toy_name) {
				index = i;
				break;
			}
		}
		return index;
	}

	var removeFromDonated = function(id) {
		var toy_name = id.split('-').slice(-1)[0];
		var index = findIndexByName(toy_name, selected_child.donated);
		if (index != -1) {
			selected_child.donated.splice(index, 1);
			rootRef.child('children').child(selected_child.id).child('donated').set(selected_child.donated);		
		}
	}

	var removeFromToyChest = function(id) {
		var toy_name = id.split('-').slice(-1)[0];
		var index = findIndexByName(toy_name, selected_child.toyChest);
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

	var addToToychest = function(toy_name, img_src) {
		selected_child.toyChest.push({name: toy_name, img_src: img_src});
		rootRef.child('children').child(selected_child.id).child('toyChest').set(selected_child.toyChest);
	}

	var addToDonated = function(toy_name, img_src) {
		selected_child.donated.push({name: toy_name, img_src: img_src});
		rootRef.child('children').child(selected_child.id).child('donated').set(selected_child.donated);
	}

	var moveToToychest = function(id) {
		var toy_name = id.split('-').slice(-1)[0];
		var index = findIndexByName(toy_name, selected_child.donated);
		var toy_img_src = selected_child.donated[index].img_src;
		removeFromDonated(id);
		addToToychest(toy_name, toy_img_src);
	}

	moveToDonations = function(id) {
		var toy_name = id.split('-').slice(-1)[0];
		var index = findIndexByName(toy_name, selected_child.toyChest);
		var toy_img_src = selected_child.toyChest[index].img_src;
		removeFromToyChest(id);
		addToDonated(toy_name, toy_img_src);
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
			html_str = '<div class="col s6 l2 item-col"><div id="donations-item-'+donated[i].name+'" class="card toy z-depth-0"><div class="card-image">'
                       + '<img src="' + donated[i].img_src + '">'
                       + '<span class="card-title">' + donated[i].name + '</span></div>'
                       + '<div class="card-action">'
                       + '<i class="material-icons left-align waves-effect tooltipped return" data-position="right" data-delay="50" data-tooltip="Return to toyChest">arrow_back</i>'
                       + '<i class="material-icons right waves-effect tooltipped donate" data-position="left" data-delay="50" data-tooltip="Mark as donated">check</i>'
                       + '</div></div></div>';
        	$("#donations").append(html_str);
        	// $("#donations-item-"+donated[i].name).tooltip({ selector: '[data-toggle="tooltip"]' });
        	$("#donations-item-"+donated[i].name+"> .card-action > .donate").click(deleteAction);
        	$("#donations-item-"+donated[i].name+"> .card-action > .return").click(deleteAction);
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

    $(".shop").click(function(event) {
    	window.location.href = "shopping.html";
    });

    $("#add-toy-form").submit(function(event) {
    	event.preventDefault();
    	var toy_name = $("#toy-name").val();
    	// tODO: how to get image?
    	// var img_src = 
    	console.log("here");
    })


});