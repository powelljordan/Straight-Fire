// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	$(".button-collapse").sideNav();
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
			wishlist: [0,1]
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
			'<div class = "col-xs-6 col-sm-4 col-md-4 " id="'+child.id+'">'+
				'<div class="card small">'+
			      '<div class = "card-image waves-effect waves-block waves-light">'+
			         '<img class="activator" src = "../images/'+ child.name.charAt(0).toLowerCase() + child.name.slice(1) + '.png" alt = "Generic placeholder thumbnail">'+
			      '</div>'+
			      '<div class = "card-content" style="text-align:center">'+
			         '<span class="card-title activator name"></span>'+
			         '<div class="btn-group" style="text-align:center">'+
			            '<a href = "toys.html?name='+ child.name +'" class = "btn btn-default btn-toychest" role = "button">'+
			               'Toys'+
			            '</a> '+
			            '<a href="shopping.html?name='+child.name+'" id="btn-start-shopping" class="btn btn-default" role = "button">' + 
			            	' Shop'+
			            '</a>' +
			          '</div>'+  
			       '</div>'+
			       '<div class="card-reveal style="text-align:center>'+
			       	 '<span class="card-title grey-text text-darken-4 name"><i class="material-icons right">close</i></span>'+ 
			       	 '<div class = "card-image waves-effect waves-block waves-light">'+
		      			'<i class="edit_'+child.id+' material-icons large edit-icon  profile ">edit</i>'+
		      		 '</div>'+
		      		 '<div class="card-content edit-icon-text">Edit Profile</div>'+       
			      '</div>'+
			     '</div>'+
		   	'</div>'
			);
		$("#"+child.id).find(".card-content").find(".name").text(child.name);
		$("#"+child.id).find(".card-reveal").find(".name").html(child.name + '<i class="material-icons right">close</i>');
		// $("#"+child.id).find(".card-reveal").find(".age").text(child.age);
		child.interests.forEach(function(interest){
			$("#"+child.id).find(".card-reveal").find("#interest-list").append(
	            '<li class="collection-item">'+interest+'</li>'
            );
		});



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

	$("#profiles").append(
		'<div id="btn-new-profile" class = "col-xs-6 col-sm-4 col-md-4" id="btn-create-profile">'+
			'<div class="card small">'+
		      '<div class = "card-image waves-effect waves-block waves-light">'+
		      '<i class="material-icons large add-icon">add</i>'+
		      '</div>'+
		      '<div class="card-content" style="text-align:center; font-size:2em; padding-top:2em">Add another child</div>'+
		    '</div>'+
	   	'</div>'
		);

	$(".profile").click(function(event){
		// console.log(event.target);
		if (event.target.classList[0] == "btn") return;
		var profile = event.target.parentElement;
		if (profile.classList[0] != 'profile') {
			profile = profile.parentElement;
		}
		// var child = $.grep(children, function(e){ return e.id == profile.id; })[0];
		console.log("ID", event.target.classList[0].split("_"));
		window.location.href = "profile.html?name="+dbChildren[event.target.classList[0].split("_")[1]].name;
	});

	$("#btn-new-profile").click(function(event) {
		$("#new-profile-modal").openModal();
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
	var editMode = false;
	$("#manageProfiles").click(function(event){
		editMode = !editMode;
		console.log(children)
		children.forEach(function(child){
			if(editMode){
				$("#"+child.id).find(".card-content").find(".name").css("color", "white");
				$("#manageProfiles").text("Done");
				$(document.body).css("overflow", "hidden");
				$("#"+child.id)
				.find('.card')
				.find('.card-reveal')
				.css({ display: 'block'})
				.velocity("stop", false)
				.velocity({translateY: '-100%'}, {duration: 300, queue: false, easing: 'easeInOutQuad',
					complete: function(){
						$(document.body).css("overflow", "visible");
					}
				});
				
			}else{
						$(document.body).css("overflow", "hidden");
				    $("#"+child.id)
				    .find('.card-reveal').velocity(
				    {translateY: 0}, 
				    {
				      duration: 225,
				      queue: false,
				      easing: 'easeInOutQuad',
				      complete: function() {
				        $(this).css({ display: 'none'});
				        $("#manageProfiles").text("Manage Profiles");
				 				$("#"+child.id).find(".card-content").find(".name").css("color", "black");
				 				$(document.body).css("overflow", "visible");
				      }
				    });
			}
		});
	});
});