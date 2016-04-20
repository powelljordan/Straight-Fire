// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	//Load Children Data
	john = {id: "One",
			name: "John",
			age: 13,
			budget: 50,
			toyChest: ["Dinosaur", "Gameboy", "Lego", "Racecar", "Cards", "another", "and another"]}

	david = {id: "Two",
			name: "David",
			age:8,
			budget: 50,
			toyChest: ["Connect 4", "Chess", "Book", "Xbox", "Wii"]}

	var children = [john, david];
	var firstItem = true;
	var offset;
	var test = function(){
		console.log("gets called");
	};


	/**
	Firebase Stuff

	Initialize Firebase Reference
	This makes rootRef a Firebase object sorta like getting a reference to the javascript object holding our data
	We can use methods of this rootRef object to store and query data.
	All querying is done through callbacks

	*/
	var rootRef = new Firebase("https://toychest.firebaseio.com/");

	//For example I can add the two children I defined above to our firebase
	children.forEach(function(child){
		rootRef.child(child.id).set(child);
	})

	//Then I can print them from the database as they're added by adding a listener and getting a snapshot
	rootRef.on("child_added", function(snapshot){
		console.log(snapshot.val());
	});


	//There are other events and custom queries that you can do, but that's kinda the gist
	//Go ahead and add an delete some things in the database to get a feel for how it behaves. There aren't any
	//Read or write permissions right now so technically I think anyone can write to the db, but if we feel it's necessary
	//we can add those later



	children.forEach(function(child){
		// console.log(firstItem);
		offset = "";
		if(firstItem){
			offset="col-md-offset-2";
			firstItem = false;
		}else{
			firstItem = true;
		}
		$("#profiles").append(
			'<div class = "profile col-sm-6 col-md-4 '+offset+'" id="'+child.id+'">'+
				'<div class="panel child-panel-card">'+
			      '<div class = "thumbnail">'+
			         '<img src = "../images/'+ child.name.charAt(0).toLowerCase() + child.name.slice(1) + '.png" alt = "Generic placeholder thumbnail">'+
			      '</div>'+
			      
			      '<div class = "caption">'+
			         '<p class="home-profile-text">Name: <span class="name"></span></p>'+
			         '<p class="home-profile-text">Age: <span class="age "></span></p>'+
			         '<p class="home-profile-text">Budget: <span class="budget"></span></p>'+
			       '</div><div class="btn-wrapper">'+
			            '<a href = "#" id="'+ child.name +'" class = "btn btn-default btn-toychest" role = "button">'+
			               'ToyChest'+
			            '</a> '+
			            '<a href = "#" id="'+ child.name +'"class = "btn btn-default btn-wishlist" role = "button">'+
			               'Wishlist'+
			            '</a>'+
			            '<a href="shopping.html?name='+child.name+'" id="btn-start-shopping" class="btn btn-default" role = "button">' + 
			            	'<span class = "glyphicon glyphicon-shopping-cart"></span> Start Shopping'+
			            '</a>' +	            
			      '</div>'+
			     '</div>'+
		   	'</div>'
			);
		$("#"+child.id).find(".caption").find(".home-profile-text").find(".name").text(child.name);
		$("#"+child.id).find(".caption").find(".home-profile-text").find(".age").text(child.age);
		$("#"+child.id).find(".caption").find(".home-profile-text").find(".budget").text(child.budget);


		$("#toyChestModal").append( 
			'<div class = "thumbnail col-md-6 col-sm-6">'+
			'<h3 class="text-center">'+child.name+'</h3>'+
			'<ul id="'+child.id+'toyChest" class = "list-group checked-list-box">'+
			'</ul></div>'
			);

		child.toyChest.forEach(function(toyName){
			$("#"+child.id+"toyChest").append(
				'<div class="col-md-12 col-sm-12 toy-section">'+
				'<div class="col-md-3 col-sm-3 col check-column">'+
                    '<p class="checkbox"><i class="fa fa-square-o"></i></p>'+
                '</div>'+
                '<div class="col-md-9 col-sm-9 col"><h3>'+toyName+'</h3></div>'+
                // '<div class="col-md-3 col-sm-3 col"><img src="../images/'+toyName+'.jpg" class="toy-image center-block"></div>'+
                '</div>'
			);
		});
	});

	$(".profile").click(function(event){
		// console.log(event.target);
		if (event.target.classList[0] == "btn") return;
		var profile = event.target.parentElement;
		if (profile.classList[0] != 'profile') {
			profile = profile.parentElement;
		}
		var child = $.grep(children, function(e){ return e.id == profile.id; })[0];
		window.location.href = "profile.html?name="+child.name;
	});

	$("#btn-new-profile").click(function(event) {
		$("#new-profile-modal").modal('show');
	});

	$("#btn-create-profile").click(function(event) {
		var name = $("#create-name").val();
		var age = $("#create-age").val();
		var interests = $("#create-interests").val();
		if (name == "" || age == "") {
			alert("Please fill out Name and Age.");
		} else {
			window.location.href = "profile.html?name="+name+"&age="+age+"&interests="+interests;
			$("#create-profile-form").find('.form-group').find('input').each(function(index, elem){
				($(elem)).val('');
			});
		}
	});

	$(".btn-toychest").click(function(event) {
		var name = event.toElement.id;
		$("#toychest-modal").modal("show");
		$("#toychest-name").text(name);
	});

	$(".btn-wishlist").click(function(event) {
		var name = event.toElement.id;
		$("#toychest-modal").modal("show");
		$("#toychest-name").text(name);
	});
});