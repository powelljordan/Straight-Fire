// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	$(".button-collapse").sideNav();
	$('select').material_select();
	//Load Children Data
	john = {id: "One",
			name: "John",
			img_src: "../images/john.png",
			age: 13,
			budget: 50,
			toyChest: [
				{
					id:0,
					name: "Dinosaur",
					img_src: "../images/Dinosaur.jpg",
				},
				{
					id:1,
					name: "Gameboy",
					img_src:"../images/Gameboy.jpg"
				} ,
				{
					id:2,
					name:"Lego",
					img_src:"../images/Lego.jpg"
				}, 
				{
					id:3,
					name:"Racecar",
					img_src:"../images/Racecar.jpg"
				}, 
				{
					id:4,
					name:"Cards",
					img_src:"../images/Cards.jpg"
				}
			],
			donated: [{
				id:0,
				name:"Book",
				img_src:"../images/Book.jpg"
			},
			{
				id:1,
				name:"Color Fingeres",
				img_src:"../images/color_fingers.jpg"
			}],
			interests:["Biking", "Arts & Crafts", "Star Wars"],
			wishlist: [3,4]
		}

	david = {id: "Two",
			name: "David",
			img_src: "../images/david.png",
			age:8,
			budget: 50,
			toyChest: [
			{
				id:0,
				name:"Connect 4",
				img_src:"../images/Connect 4.jpg"
			},
			{
				id:1,
				name: "Chess",
				img_src:"../images/Chess.jpg"
			},
			{
				id:2,
				name:"Xbox",
				img_src:"../images/Xbox.jpg"
			},
			{
				id:3,
				name:"Wii",
				img_src:"../images/Wii.jpg"
			}],
			donated: [{
				id:0,
				name:"Gameboy",
				img_src:"../images/Gameboy.jpg"
			},{
				id:1,
				name:"Scooter",
				img_src:"../images/scooter.jpg"
			}],
			interests:["Cars", "Action Figures", "Painting"],
			wishlist: [0,1]
		}

	jill = {
		name:"Jill",
		img_src: "../images/jill.png",
		size: "3.33KB" 
	}	

	annie = {
		name:"Lisa",
		img_src: "../images/lisa.png",
		size: "5.56KB" 
	}	


	var images = [jill, annie];
	var selectedImage;

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
	var childrenDB = rootRef.child("children");
	children.forEach(function(child){
		rootRef.child('children').child(child.id).set(child);
	})

	//Then I can print them from the database as they're added by adding a listener and getting a snapshot
	rootRef.child('children').on("value", function(snapshot){
		dbChildren = snapshot.val();
		children = [];
		for (var key in dbChildren) {
	    // skip loop if the property is from prototype
	    if (!dbChildren.hasOwnProperty(key)) continue;

	    var obj = dbChildren[key];
	    children.push(obj);
		}
	});


	//There are other events and custom queries that you can do, but that's kinda the gist
	//Go ahead and add an delete some things in the database to get a feel for how it behaves. There aren't any
	//Read or write permissions right now so technically I think anyone can write to the db, but if we feel it's necessary
	//we can add those later

	$("#profiles").append(
	'<div id="btn-new-profile" class = "col s6 m3">'+
		'<div class="card add-card">'+
	      '<div class = "card-image add-icon-container">'+
	      '<i class="material-icons large add-icon">add</i>'+
	      '</div>'+
	      '<div id="addToyText" class="add-label">ADD CHILD</div>'+
	    '</div>'+
   	'</div>'
	);


	childrenDB.on("child_added", function(snapshot){
		var child = snapshot.val();

		$("#btn-new-profile").before(
			'<div class = "col s6 m3" id="'+child.id+'">'+
				'<div class="card child-card">'+
			      '<div class = "profile-image card-image">'+
			         '<img class="activator" src = "../images/'+ child.name.charAt(0).toLowerCase() + child.name.slice(1) + '.png" alt = "Generic placeholder thumbnail">'+
			      '</div>'+
			      '<div class = "card-content">'+
			         '<div class="row btn-row">'+
			            '<a href = "toys.html?id='+ child.id +'" class = "btn btn-toychest col s6" role = "button">'+
			               'Toys'+
			            '</a> '+
			            '<a href="shopping.html?id='+child.id+'" class="btn btn-start-shopping col s6" role = "button">' +
			            	' Shop'+
			            '</a>' +
			          '</div>'+
					  '<div class="card-title name"></div>' +
			       '</div>'+
			       '<div class="edit-section">'+
			       	 '<div class = "card-image waves-effect waves-block waves-light edit-icon-container">'+
		      			'<i class="edit_'+child.id+' material-icons large edit-icon  profile">edit</i>'+
		      		 '</div>'+
			      '</div>'+
			     '</div>'+
		   	'</div>'
			);
		$("#"+child.id).find(".card-content").find(".name").text(child.name);
		$("#"+child.id).find(".card-reveal").find(".name").html(child.name);


		$(".profile").click(function(event){
	// console.log(event.target);
			if (event.target.classList[0] === "btn") return;
			var profile = event.target.parentElement;
			if (profile.classList[0] !== 'profile') {
				profile = profile.parentElement;
			}
			// var child = $.grep(children, function(e){ return e.id == profile.id; })[0];
			console.log("ID", event.target.classList[0].split("_"));
			var selectedChild = dbChildren[event.target.classList[0].split("_")]
			var name = selectedChild.name;
			var interests = selectedChild.interests;
			$("#nameField-input").val(name);
			$("#edit-profile-modal").openModal();
			// window.location.href = "profile.html?name="+dbChildren[event.target.classList[0].split("_")[1]].name;
		});

	});

	$(".card-reveal").click(function(event) {
		console.log("hello");
		$("#edit-profile-modal").openModal();
	});
// =======

// 	});

//     $(document).on("click", ".edit-section.show-edit", function(event) {
//         var child = $(event.target).parents('.col.s6.m3').attr('id');
//         window.location.href = "profile.html?name="+dbChildren[child].name;
//     });
// >>>>>>> 6ce0bc6afa66275b64876f0bda077c24d7a9c369

	$("#btn-new-profile").click(function(event) {
		$("#new-profile-modal").openModal();
	});

	$("#addFile").click(function(){
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
			console.log($(event.target));
			if(selectedImage){
				selectedImage.css("background-color", "#ffffff");
				selectedImage.css("border-color", "#ffffff");
			}
			selectedImage = $(event.target);
			$(event.target).css("background-color", "#e1f5fe");
			$(event.target).css("border-style", "solid");
			$(event.target).css("border-width", "2px");
			$(event.target).css("border-color", "#b3e5fc");
			$(event.target).css("opacity", "1");
			console.log($("#file-name"));
			$("#file-name").val($(this).attr("value"));
			console.log($(this).attr("value"));
		});
	});


	$("#btn-cancel-file").click(function(){
		$("#choose-file-modal").closeModal();
	});

	$("#btn-open-file").click(function(){
		console.log("soething");
		if(selectedImage){
			console.log($("#file-path"));
			$("#file-path").val(selectedImage.attr("value")+".png");
		}
		
		$("#choose-file-modal").closeModal();
	});

	$("#btn-create-profile").click(function(event) {
		var name = $("#create-name").val();
		var age = $("#create-age").val();
		if(name === "" || age === ""){
			if (name === "") {
				Materialize.toast('Please fill out the name field', 5000);
			}
			if(age === ""){
				Materialize.toast('Please fill out the age field', 5000);
			}
		} else {
			var img_src = selectedImage.find(".card").find(".card-image").find("img").attr("src");
			var interests = $("#create-interests").val();
			var interestsList = [];
			$("#create-interests").val().split(",").forEach(function(elem, ind) {
				interestsList.push(elem.trim());
			});
			childrenDB.child(name).set(
				{age: age,
				donated: [],
				id:name,
				name:name,
				img_src:img_src,
				interests:interestsList,
				toyChest: [],
				wishlist:[]
				});
			$("#new-profile-modal").closeModal();
			window.location.href = "toys.html?id="+name;
		}
	});

	var editMode = false;

	$("#manageProfiles").click(function(event){
		editMode = !editMode;
        if (editMode) {
            $("#manageProfiles").text("Done");
            $('.edit-section', '.child-card').fadeIn().addClass('show-edit');
        } else {
            $("#manageProfiles").text("Manage Profiles");
            $('.edit-section', '.child-card').fadeOut().removeClass('show-edit');
        }
	});
});