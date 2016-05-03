$(function() {
	$('select').material_select();
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
				undoMessage = "Delete from wishlist";
				removeFromWishlist(item_id);
			}
		} else if ($(this).hasClass('shop')) {
			// undoMessage = "Purchase";
			var wishlist_item_id = item_id.split('-').splice(-1)[0];
			rootRef.child('items').child(wishlist_item_id).on('value', function(snap){
				var item = snap.val();
				shopConfirm();
				$("#confirm-modal").data("item_id", item.id);
				$("#confirm-modal").data("name", item.name);
				$("#confirm-modal").data("img_src", item.img_src);
				$("#confirm-modal").data("id", item_id);
				// moveFromWishlistToToychest(item.id, item.name, item.img_src, item_id);
				target_url = item.url;
				// openExternalPage();
			});
		}
		if (!$(this).hasClass('shop')) {
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
		}
	};

	var purchase_state = false;

	var purchaseConfirm = function() {
		purchase_state = true;
		$("#btn-continue").text("Ok");
		$("#continue-desc").text($("#confirm-modal").data("name") + " has been moved to " + selected_child.name + "'s toyChest.");
		$("#btn-cancel").css({"display":"None"});
	}

	var shopConfirm = function() {
		$("#continue-desc").text('You will be directed to an external page to complete your transaction.');
		$("#btn-cancel").css({"display":"block"});
		$("#btn-continue").text("Continue");
		$("#confirm-modal").openModal();
	}

	$("#btn-continue").click(function(event) {
		if (!purchase_state) {
			undoMessage = "Purchase";
			var id = $("#confirm-modal").data("id");
			moveFromWishlistToToychest($("#confirm-modal").data("item_id"), 
					$("#confirm-modal").data("name"), 
					$("#confirm-modal").data("img_src"), 
					id
				);
			open(target_url, "_blank");
			$("#"+id).parents('.item-col').fadeOut({
				complete: function() {
					lastDeleted = $(this).addClass('item-hidden');
					// Hide all other undo's
					$('#donations-undo').fadeOut();
					$('#toychest-undo').fadeOut();
					$('#wishlist-undo').fadeOut();
					// Set the appropriate tab's undo
					$('#wishlist-undo-action').text(undoMessage);
					$('#wishlist-undo').fadeIn();
				}
			});
			purchaseConfirm();
		} else {
			$("#confirm-modal").closeModal();
			purchase_state = false;
		}
	});

	$("#btn-cancel").click(function(event) {
		$("#confirm-modal").closeModal();
	})

	var openExternalPage = function() {
		var confirmation = confirm("You will be directed to an external page to complete your transaction.");
		if (confirmation){
			open(target_url, "_blank");
		}
	}

	// var shopAction = function() {
	// 	var id = $(this).parents('.card')[0].id;
	// 	var item_id = id.split('-').splice(-1)[0];
	// 	rootRef.child('items').child(item_id).on('value', function(snap){
	// 		var item = snap.val();
	// 		moveFromWishlistToToychest(item.id, item.name, item.img_src, id);
	// 		// target_url = item.url;
	// 		// openExternalPage();
	// 	});
	// }

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
        $("#wishlist-item-"+item.id+"> .card-action > .shop").click(deleteAction);
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

	var moveFromWishlistToToychest = function(item_id, toy_name, img_src, id, display = true) {
		var toychest_id = addToToychest(toy_name, img_src);
		removeFromWishlist(id);
		if (display) {
			displayToychestItem({id: toychest_id, name:toy_name, img_src: img_src});
		}
		return toychest_index;
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

    var switchChild = function(c_id) {
    	child_id = c_id;
    	clearChildSpecificFields();
    	var child;
    	for (var i = 0; i < children.length; i++) {
    		child = children[i];
    		if (children[i].id == c_id) {
    			selected_child = child;
				toychest_index = (child.toyChest == undefined) ? 0 : child.toyChest[child.toyChest.length-1].id;
				donated_index = (child.donated == undefined) ? 0 : child.donated[child.donated.length-1].id;
				if (!child.toyChest) {
					selected_child.toyChest = [];
				}
				if (!child.wishlist) {
					selected_child.wishlist = [];
				}
				if (!child.donated) {
					selected_child.donated =[];
				}
				updateChildParams(child);
				loadAndDisplayChildInfo(child);
			} else {
				displayInactiveChild(child);
    		}
    	}
    }

    var bindInactiveChild = function() {
	    $('.inactive-child').click(function(event) {
	    	var c_id = event.toElement.id.split('-')[1];
	    	toggleChildMenu(null, true);
	    	switchChild(c_id);
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
		if (c.wishlist) {
			for (var i = 0; i < c.wishlist.length; i++) {
				rootRef.child('items').child(c.wishlist[i]).on('value', function(snap){
					var item = snap.val();
					displayWishlistItem(item);
				});
			}
		}
		if (c.toyChest) {
			displayToychest(c.toyChest);
		}
		if (c.donated) {
			displayDonated(c.donated);
		}
	};

    $('.shop-link').hover(function(){$('.shop-link').addClass('shop-link-hover')}, function(){$('.shop-link').removeClass('shop-link-hover') });

	// Load all children
	var children = [];
	rootRef.child("children").on("child_added", function(snapshot){
		var child = snapshot.val();
		children.push(child);
		// If child the selected child, update the page
		if (child.id == child_id) {
			selected_child = child;
			toychest_index = (child.toyChest == undefined) ? 0 : child.toyChest[child.toyChest.length-1].id;
			donated_index = (child.donated == undefined) ? 0 : child.donated[child.donated.length-1].id;
			if (!child.toyChest) {
				selected_child.toyChest = [];
			}
			if (!child.wishlist) {
				selected_child.wishlist = [];
			}
			if (!child.donated) {
				selected_child.donated =[];
			}
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
			if ($(this).text().split(' ').splice(-1)[0] == "'Purchase'") {
				// remove from toychest
				removeFromToyChest('toychest-item-' + toychest_index);
				// remove toychest display
				removeDisplayToyChestItem(toychest_index);
			}
		}
	});

    $('.add-toy-card').leanModal();

    $(".shop-link, .shop").click(function(event) {
    	window.location.href = "shopping.html?id=" + child_id;
    });

    $("#add-toy-form").submit(function(event) {
    	event.preventDefault();
    	var toy_name = $("#toy-name").val();
    	// tODO: how to get image?
    	// var img_src = 
    })



    //choose-file-modal methods


    toyStory = {
		name:"Toy Story Doll",
		img_src: "../images/toyStory.jpg",
		size: "132KB" 
	}	

	mickey = {
		name:"Mickey Mouse",
		img_src: "../images/mickey.jpg",
		size: "32.2KB" 
	}	

	panda = {
		name:"Designer",
		img_src: "../images/panda.jpg",
		size: "33.0KB"
	}


	var images = [toyStory, mickey, panda];
	var selectedImage;

    	$(".add-toy-card").click(function(){
			$("#choose-file-modal").openModal();
			$("#localImages").html("");
			$("#file-dropdown").html("");
			$("#file-dropdown").append('<option id="default-option" value="" disabled selected>File Name</option>');
			images.forEach(function(image, index){
				$("#localImages").append(
				'<div class="brightness col s6 m4" value="'+image.name+'"">'+
				'<div class="card col s6 m6 select-file-image">'+			    
					'<div class="card-image waves-effect waves-block waves-light">'+
			      '<img class="responsive-img" width="15%" height="15%" style="float:left"src="'+image.img_src+'" alt="" >'+
			    '</div>'+
			  '</div>'+
			    '<div class="col s6 m6 file-image-text">'+
			      '<p><span>'+image.name+'</span><br>'+
			      	'PNG<br>'+
			        '<span class="image-size">'+image.size+'</span>'+
			      '</p>'+
		      '</div>'+
		     '</div>'
				)
			});

			$(".brightness").click(function(event){
			if(selectedImage){
				selectedImage.css("background-color", "#ffffff");
				selectedImage.css("border-color", "#ffffff");
			}
			selectedImage = $(event.target);
			$(event.target).css("background-color", "#e1f5fe");
			$(event.target).css("border-style", "solid");
			$(event.target).css("border-width", "2px");
			$(event.target).css("border-color", "#b3e5fc")
			$(event.target).css("opacity", "1");
			$("#file-name").val($(this).attr("value"));
		});
		});



    $("#btn-cancel-file").click(function(){
		$("#choose-file-modal").closeModal();
	});

	$("#btn-open-file").click(function(){
		if(selectedImage){
			addToToychest(selectedImage.attr("value"),
				selectedImage.find(".card").find(".card-image").find("img").attr("src"));
			displayToychestItem({id:toychest_index,
								name:selectedImage.attr("value"),
								img_src:selectedImage.find(".card").find(".card-image").find("img").attr("src")}
								);
		}

		
		$("#choose-file-modal").closeModal();
	});


});