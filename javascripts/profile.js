interests = [];
currentChild = "";
$(function() {
	children = [
		{
			id: "One",
			name: "John",
			age: 13,
			budget: 50,
			toyChest: ["Dinosaur", "Gameboy", "Lego", "Racecar", "Cards", "other toys"],
			interests: ["Star Wars", "Arts & Crafts", "Biking"],
			img_src: "../images/john.png"
		},
		{
			id: "Two",
			name: "David",
			age:8,
			budget: 50,
			toyChest: ["Connect 4", "Chess", "Book", "Xbox", "Wii", "yet another toy"],
			interests: ["LEGOs", "Painting", "Action Figures", "Cars"],
			img_src: "../images/david.png"
		}
	];


	childrenDB = new Firebase("https://toychest.firebaseio.com/children");

	// $("#nameField-input").css({display:"None"});
	// $("#ageField-input").css({display:"None"});

	// // save button
	function save() {
		// make input text into solid text
		var newName = $('#nameField-input').val();
		if (newName) {
			childrenDB.child(currentChild).child("name").set(newName);
		}

		var newAge = $('#ageField-input').val();
		if (newAge) {
			childrenDB.child(currentChild).child("age").set(newAge);
		}
		console.log(interests);
		if (interests) {
			childrenDB.child(currentChild).child("interests").set(interests);
		}
		Materialize.toast("Changes saved", 1500);
	} 

	// for the add interest plus button
	function addInterest(newInterest) {
		id = $(".remove-interest").length;
		// make sure an interest is entered
		if (newInterest) {
			// insert new row
			var listItem = $("<li class='collection-item'></li>");
				// add interest
   			var itemName = $("<span>" + newInterest + "</span>");
            var deleteBtn = $("<span class='badge remove-interest'><i class='fa fa-close' style='pointer-events:none'></i></span>");
   			// prepend new interest to top of list
   			listItem.append(itemName, deleteBtn).prependTo("#interest-list");
   			$('#interestsField-input').val("");
   			interests.push(newInterest);
   			console.log(interests);
		}
	}

	var removeInterest = function(interest){
		if(interests.indexOf(interest) > -1){
			interests.splice(interests.indexOf(interest), 1);
			$("#interest-list").html("");
			console.log("before we re-add", interests);
			console.log(currentChild);
			interests.forEach(function(newInterest){
				if (newInterest) {
					// insert new row
					var listItem = $("<li class='collection-item'></li>");
						// add interest
		   			var itemName = $("<span>" + newInterest + "</span>");
		            var deleteBtn = $("<span class='badge remove-interest'><i class='fa fa-close' style='pointer-events:none'></i></span>");
		   			// prepend new interest to top of list
		   			listItem.append(itemName, deleteBtn).prependTo("#interest-list");
		   			$('#interestsField-input').val("");
		   			console.log(interests);
				}
			})
		}
	}


	$("#delete-profile").click(function(){
		childrenDB.child(currentChild).remove();
		$("#edit-profile-modal").closeModal();
		$("#"+currentChild).remove();
	})


	// // only allow letters and white spaces to be typed for name and interests fields
	$("#interestsField-input").keypress(function(event){
        var inputValue = event.which;
        // allow letters and whitespaces only.
        if((inputValue > 47 && inputValue < 58) && (inputValue != 32)){
            event.preventDefault();
        }
    });

    $("#nameField-input").keypress(function(event){
        var inputValue = event.which;
        //interest allow letters and whitespaces only.
        if((inputValue > 47 && inputValue < 58) && (inputValue != 32)){
            event.preventDefault();
        }
    });


	// // add an interest with enter key press
	$("#interest-input").keyup(function(event){
	    if(event.keyCode == 13){
	    	if ($("#interest-input").val()){
	    		addInterest($('#interest-input').val());
                $("#interest-input").val("");
	    	} else {
	    		save();
	    	}
	    }
	});

    $("#add-interest").click(function() {
       if ($("#interest-input").val()) {
           addInterest($("#interest-input").val());
           $("#interest-input").val("");
       }
    });

	$("#btn-save-changes").click(function(event){
		save();
	});

	$("#interest-list").on('click', '.remove-interest', function(event){
		$(event.target).parents('.collection-item').detach();
		var deletedInterest = $(event.target).parents('.collection-item').find('span')[0].innerText;
		removeInterest(deletedInterest);
		console.log(interests);

	});

	// $("#btn-start-shopping").click(function(event){
	// 	var name = $("#name").text();
	// 	window.location.href = "shopping.html?name="+name;
	// });

	// Main code
	var args = location.search.slice(1).split('&');
	var cur_child = {};
	for (var i = 0; i < args.length; i++) {
		var param = args[i].split('=');
		cur_child[param[0]] = param[1];
	}

	var child = $.grep(children, function(e){ return e.name == cur_child.name; })[0]
	// Creating a new child
	if (args.length > 1 && !child) {
		createChild(cur_child.name, cur_child.age, cur_child.interests.split("%20").join("").split(','));
	} else {
		// Load modal if no child selected, or show specified child's profile
		// if (cur_child.name == undefined){
		// 	$("#choose-child-modal").openModal();
		// } else {
		// 	loadChildInfo(cur_child.name);
		// }
	}


	// $(".child-card").click(function(event){
	// 	var name = event.target.parentElement.id.split('-')[1];
	// 	name = name.charAt(0).toUpperCase() + name.slice(1);
	// 	loadChildInfo(name);
	// });
			
});