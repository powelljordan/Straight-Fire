// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	//Load Children Data
	john = {id: "One",
			name: "John",
			age: 13,
			budget: 50,
			toyChest: ["Dinosaur", "Gameboy", "Lego", "Racecar", "Cards", "other toys"]}

	david = {id: "Two",
			name: "David",
			age:8,
			budget: 50,
			toyChest: ["Connect 4", "Chess", "Book", "Xbox", "Wii", "yet another toy"]}
	annie = {id: "three",
			name: "Annie",
			age: 22,
			budget: 1000,
			toyChest: ["camera", "metal thing", "laptop", "tennis ball"]}

	var children = [john, david, annie];
	var firstItem = true;
	var offset;
	var test = function(){
		console.log("gets called");
	}
	children.forEach(function(child){
		console.log(firstItem);
		offset = "";
		if(firstItem){
			offset="col-md-offset-2";
			firstItem = false;
		}else{
			firstItem = true;
		}
		$("#profiles").append(
			'<div class = "col-sm-6 col-md-4 '+offset+'" id="'+child.id+'">'+
		      '<div class = "thumbnail profile">'+
		         '<img src = "../images/cute cat.jpg" alt = "Generic placeholder thumbnail">'+
		      '</div>'+
		      
		      '<div class = "caption">'+
		         '<p class="home-profile-text">Name: <span class="name"></span></p>'+
		         '<p class="home-profile-text">Age: <span class="age "></span></p>'+
		         '<p class="home-profile-text">Budget: <span class="budget"></span></p>'+
		         '<p>'+
		            '<a href = "#" class = "btn btn-default" role = "button">'+
		               'ToyChest'+
		            '</a> '+
		            '<a href = "#" class = "btn btn-default" role = "button">'+
		               'Wishlist'+
		            '</a>'+
		         '</p>'+
		      '</div>'+
		   	'</div>'
			);
		$("#"+child.id).find(".caption").find(".home-profile-text").find(".name").text(child.name);
		$("#"+child.id).find(".caption").find(".home-profile-text").find(".age").text(child.age);
		$("#"+child.id).find(".caption").find(".home-profile-text").find(".budget").text(child.budget);


		$("#toyChestModal").append( 
			'<div class = "thumbnail col-md-6">'+
			'<h3 class="text-center">'+child.name+'</h3>'+
			'<ul id="'+child.id+'toyChest" class = "list-group checked-list-box">'+
			'</ul></div>'
			);

		child.toyChest.forEach(function(toyName){
			$("#"+child.id+"toyChest").append(
				'<a href="#" class="list-group-item">'+toyName+'<img src="../images/testToyPicture.png"></a>'
			);
		});
	});
});