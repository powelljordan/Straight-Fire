$(function() {
	children = [
		{
			id: "One",
			name: "John",
			age: 13,
			budget: 50,
			toyChest: ["Dinosaur", "Gameboy", "Lego", "Racecar", "Cards", "other toys"],
			interests: ["Star Wars", "Arts & Crafts", "Biking"]
		},
		{
			id: "Two",
			name: "David",
			age:8,
			budget: 50,
			toyChest: ["Connect 4", "Chess", "Book", "Xbox", "Wii", "yet another toy"],
			interests: ["LEGOs", "Painting", "Action Figures"]
		}
	];

	$("#nameField-input").css({display:"None"});
	$("#ageField-input").css({display:"None"});
	$("#interestsField-input").css({display:"None"});

	// save button
	function save() {
		// make input text into solid text
		var newName = $('#nameField-input').val();
		if (newName) {
			$("#nameField-span").text(newName);
			$("#name").text(newName);
			$("#nav-bar-dropdown").text(newName);
		}
		$("#nameField-input").css({display:'none'});
		$("#nameField-span").css({display:'inline-block'});

		var newAge = $('#ageField-input').val();
		if (newAge) {
			$("#ageField-span").text(newAge);
		}
		$("#ageField-input").css({display:'none'});
		$("#ageField-span").css({display:'inline-block'});

		var newInterest = $('#interestsField-input').val();
		if (newInterest) {
			addInterest();
		}
		$("#interestsField-input").css({display:'none'});
		$("#interestsField-span").css({display:'inline-block'});

		// remove delete icons
		var deleteIcons = $('.glyphicon .glyphicon-remove .red');
		while(deleteIcons[0]) {
			deleteIcons[0].parentNode.removeChild(deleteIcons[0]);
		}
	} 


	// editing form fields
	function editName() {
		var newName = $("#nameField-span").text();		
		// make solid text into input text
		$("#nameField-span").css({display:"none"});
		$("#nameField-input").css({display:"inline-block"});
		$("#nameField-input").val(newName);
		$("#nameField-input").select();
	} 

	function editAge() {
		var newAge = $("#ageField-span").text();
		// make solid text into input text
		$("#ageField-span").css({display:"none"});
		$("#ageField-input").css({display:"inline-block"});
		$("#ageField-input").val(newAge);
		$("#ageField").select();
	}

	function editInterest() {
		var newInterest = $("#interestsField-span").text();
		// make solid text into input text
		$("#interestsField-span").css({display:"none"});
		$("#interestsField-input").css({display:"inline-block"});
		$("#interestsField-input").val(newInterest)
		$("#interestsField").select();
	}

	// for the add interest plus button
	function addInterest(newInterest) {
		id = $(".remove-interest").length;
		// make sure an interest is entered
		if (newInterest) {
			// insert new row
			row = $("<tr class='panel panel-default'></tr>"); 
				// add interest 
   			col1 = $("<td class='first-col'></td>");
   			col2 = $("<td class='second-col'>" + newInterest + "&nbsp;&nbsp;</td>");
   			col3 = $("<td class='third-col'><span id='interest-"+id+"' class='glyphicon glyphicon-remove remove-interest red'></span></td>");
   			// prepend new interest to top of list
   			row.append(col1,col2,col3).prependTo("#interestsTable");
   			$('#interestsField-input').val("");
		}
	}


	// for error messages
	function emptyField() {

	}


	// for the delete interest x button
	function deleteInterest(row) {
		var rowOfButton = $("#"+row).parent().parent().remove();
	}

	function viewToyChest() {
		// navigates to list of toys
	}

	var loadChildInfo = function(name) {
		var child = $.grep(children, function(e){ return e.name == name; })[0];
		$("#name").text(child.name);
		$("#nameField-span").text(child.name);
		$("#ageField-span").text(child.age);
		$("#interestsTable").empty();
		for (var i = 0; i < child.interests.length; i++) {
			addInterest(child.interests[i]);
		}
	}
	
	// add an interest with enter key press
	$("#interestsField-input").keyup(function(event){
	    if(event.keyCode == 13){
	    	if ($("#interestsField-input").val()){
	    		addInterest($('#interestsField-input').val());
	    	} else {
	    		save();
	    	}
	    }
	});

	$("#nameField-input").keyup(function(event){
		if (event.keyCode==13){
			save();
		}
	});

	$("#ageField-input").keyup(function(event){
		if (event.keyCode==13){
			save();
		}
	});

	$(".edit-name").click(function(event) {
		editName();
	});

	$(".edit-age").click(function(event){
		editAge();
	});

	$("#add-interest").click(function(event){
		addInterest($('#interestsField-input').val());
	});

	$(".edit-interests").click(function(event){
		editInterest();
	});

	$("#btn-save-changes").click(function(event){
		save();
	});

	$("#interestsTable").click(function(event){
		var id = event.toElement.id;
		if (id.split('-')[0] != 'interest') {
			return;
		}
		deleteInterest(id);
	});

	$("#btn-start-shopping").click(function(event){
		var name = $("#name").text();
		window.location.href = "shopping.html?name="+name;
	})

	var name = location.search.split('=')[1];
	if (name == undefined){
		$("#choose-child-modal").modal("show");
	} else {
		loadChildInfo(name);
	}

	$(".child-card").click(function(event){
		var name = event.target.id.split('-')[1];
		name = name.charAt(0).toUpperCase() + name.slice(1);
		loadChildInfo(name);
	});
			
})