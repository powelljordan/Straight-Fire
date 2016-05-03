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

	// $("#nameField-input").css({display:"None"});
	// $("#ageField-input").css({display:"None"});

	// // save button
	// function save() {
	// 	// make input text into solid text
	// 	var newName = $('#nameField-input').val();
	// 	if (newName) {
	// 		$("#nameField-span").text(newName);
	// 		$("#name").text(newName);
	// 		$("#nav-bar-dropdown").html(newName + "<span class='caret'></span>");
	// 		$("#toychest-name").text(newName);
	// 	}
	// 	$("#nameField-input").hide();
	// 	$("#nameField-span").show();
 //        $("#name-pencil").show();

	// 	var newAge = $('#ageField-input').val();
	// 	if (newAge) {
	// 		$("#ageField-span").text(newAge);
	// 	}
	// 	$("#ageField-input").hide();
	// 	$("#ageField-span").show();
 //        $("#age-pencil").show();

	// 	var newInterest = $('#interestsField-input').val();
	// 	if (newInterest) {
	// 		addInterest();
	// 	}

	// 	// remove delete icons
	// 	var deleteIcons = $('.glyphicon .glyphicon-remove .red');
	// 	while(deleteIcons[0]) {
	// 		deleteIcons[0].parentNode.removeChild(deleteIcons[0]);
	// 	}
	// } 


	// // editing form fields
	// function editName() {
	// 	var newName = $("#nameField-span").text();		
	// 	// make solid text into input text
	// 	$("#nameField-span").hide();
	// 	$("#nameField-input").show();
	// 	$("#nameField-input").val(newName);
 //        $("#name-pencil").hide();
	// 	$("#nameField-input").select();
	// } 

	// function editAge() {
	// 	var newAge = $("#ageField-span").text();
	// 	// make solid text into input text
	// 	$("#ageField-span").hide();
	// 	$("#ageField-input").show();
	// 	$("#ageField-input").val(newAge);
 //        $('#age-pencil').hide();
	// 	$("#ageField").select();
	// }

	// for the add interest plus button
	function addInterest(newInterest) {
		id = $(".remove-interest").length;
		// make sure an interest is entered
		if (newInterest) {
			// insert new row
			var listItem = $("<li class='list-group-item'></li>");
				// add interest
   			var itemName = $("<span>" + newInterest + "</span>");
            var deleteBtn = $("<span class='badge remove-interest'><i class='fa fa-close'></i></span>");
   			// prepend new interest to top of list
   			listItem.append(itemName, deleteBtn).prependTo("#interest-list");
   			$('#interestsField-input').val("");
		}
	}


	// // only allow letters and white spaces to be typed for name and interests fields
	// $("#interestsField-input").keypress(function(event){
 //        var inputValue = event.which;
 //        // allow letters and whitespaces only.
 //        if((inputValue > 47 && inputValue < 58) && (inputValue != 32)){
 //            event.preventDefault();
 //        }
 //    });

 //    $("#nameField-input").keypress(function(event){
 //        var inputValue = event.which;
 //        //interest allow letters and whitespaces only.
 //        if((inputValue > 47 && inputValue < 58) && (inputValue != 32)){
 //            event.preventDefault();
 //        }
 //    });


    // save automatically when user clicks out of the input text box
    $("#nameField-input").blur(function() {
    	save();
	});
    $("#ageField-input").blur(function() {
    	save();
	});
    $("#interestsField-input").blur(function() {
    	save();
	});

	

	// // select child's profile to view
	// var loadChildInfo = function(name) {
	// 	var child = $.grep(children, function(e){ return e.name == name; })[0];
	// 	$("#name").text(child.name);
	// 	$("#nameField-span").text(child.name);
	// 	$("#ageField-span").text(child.age);
	// 	$("#interest-list").empty();
	// 	$("#avatarImage").attr('src',child.img_src);
	// 	for (var i = 0; i < child.interests.length; i++) {
	// 		addInterest(child.interests[i]);
	// 	}
	// };

	// // add inputs to profile for each child
	// var createChild = function(name, age, interests) {
	// 	$("#name").text(name);
	// 	$("#nameField-span").text(name);
	// 	$("#ageField-span").text(age);
	// 	$("#toychest-name").text(name);
	// 	$("#interest-list").empty();
	// 	for (var i = 0; i < interests.length; i++) {
	// 		addInterest(interests[i]);
	// 	}
	// };
	
	// // add an interest with enter key press
	// $("#interest-input").keyup(function(event){
	//     if(event.keyCode == 13){
	//     	if ($("#interest-input").val()){
	//     		addInterest($('#interest-input').val());
 //                $("#interest-input").val("");
	//     	} else {
	//     		save();
	//     	}
	//     }
	// });

 //    $("#add-interest").click(function() {
 //       if ($("#interest-input").val()) {
 //           addInterest($("#interest-input").val());
 //           $("#interest-input").val("");
 //       }
 //    });

	// $("#nameField-input").keyup(function(event){
	// 	if (event.keyCode==13){
	// 		save();
	// 	}
	// });

	// $("#ageField-input").keyup(function(event){
	// 	if (event.keyCode==13){
	// 		save();
	// 	}
	// });

	// $(".edit-name").click(function(event) {
	// 	editName();
	// 	$("#nameField-input").select();
	// });

	// $(".edit-age").click(function(event){
	// 	editAge();
	// 	$("#ageField-input").select();
	// });

	$("#add-interest").click(function(event){
		addInterest($('#interestsField-input').val());
	});

	$("#btn-save-changes").click(function(event){
		save();
	});

	$("#interest-list").on('click', '.remove-interest', function(event){
		$(event.target).parents('.list-group-item').detach();
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

	$(".child-card").click(function(event){
		var name = event.target.parentElement.id.split('-')[1];
		name = name.charAt(0).toUpperCase() + name.slice(1);
		loadChildInfo(name);
	});
			
});