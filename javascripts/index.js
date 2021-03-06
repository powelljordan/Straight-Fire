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
			wishlist: [0,9]
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

	var children = [];
	var firstItem = true;
	var offset;
	// var test = function(){
	// 	console.log("gets called");
	// };


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
	var localChildrenDB = {};
	children.forEach(function(child){
		rootRef.child('children').child(child.id).set(child);
	})

	//Then I can print them from the database as they're added by adding a listener and getting a snapshot
	rootRef.child('children').on("value", function(snapshot){
		dbChildren = snapshot.val();
		localChildrenDB = dbChildren;
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

    $('#carousel').slick({
        dots: true,
        slidesToShow: 4,
        slidesToScroll: 4
    });

	//var addCard = '<div id="btn-new-profile" class = "col s6 m3">'+
	//	'<div class="card add-card">'+
	//      '<div class = "card-image add-icon-container">'+
	//      '<i class="material-icons large add-icon">add</i>'+
	//      '</div>'+
	//      '<div id="addToyText" class="add-label">ADD CHILD</div>'+
	//    '</div>'+
   	//'</div>';

	var initialized = false;
	childrenDB.on("child_added", function(snapshot){
		if (!initialized) {
			var child = snapshot.val();
			$("#carousel").slick("slickAdd",
				'<div class = "col s6 m3" id="'+child.id+'">'+
					'<div class="card child-card">'+
				      '<div class = "profile-image card-image">'+
				      '<img class="activator" src = "'+ child.img_src + '" alt = "Generic placeholder thumbnail">'+
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


			//$(".profile").click(function(event){
			//	if (event.target.classList[0] === "btn") return;
			//	var profile = event.target.parentElement;
			//	if (profile.classList[0] !== 'profile') {
			//		profile = profile.parentElement;
			//	}
			//});
		}

	});

	function addInterest(newInterest) {
		id = $(".remove-interest").length;
		// make sure an interest is entered
		if (newInterest) {
			interests.push(newInterest);
			// insert new row
			var listItem = $("<li class='collection-item'></li>");
				// add interest
   			var itemName = $("<span>" + newInterest + "</span>");
            var deleteBtn = $("<span class='badge remove-interest'><i class='material-icons'>close</i></span>");
   			// prepend new interest to top of list
   			listItem.append(itemName, deleteBtn).prependTo("#interest-list");
   			$('#interestsField-input').val("");
		}
	}

    $(document).on("click", ".edit-section.show-edit", function(event) {
		initialized = true;
        var child = $(event.target).parents('.col.s6.m3').attr('id');
        currentChild = child;
        $("#interest-list").html("");
        $("#nameField-input").val(localChildrenDB[child].name);
        $("#ageField-input").val(localChildrenDB[child].age);
        $("#avatarImage").attr("src", localChildrenDB[child].img_src);
        interests = [];
        localChildrenDB[child].interests.forEach(function(interest){
        	addInterest(interest);
        });
        $("#edit-profile-modal").openModal();
    });



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
			$("#file-name").val($(this).attr("value"));
		});
	});


	$("#btn-cancel-file").click(function(){
		$("#choose-file-modal").closeModal();
	});

	$("#btn-open-file").click(function(){
		if(selectedImage){
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
			var img_src;
			if(selectedImage){
				img_src = selectedImage.find(".card").find(".card-image").find("img").attr("src");
			}else{
				img_src = $("#avatarImage").attr("src");
			}
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
		$('#index-undo').fadeOut();
		editMode = !editMode;
        if (editMode) {
            $("#manageProfiles").text("Done");
            $('.edit-section', '.child-card').fadeIn().addClass('show-edit');
        } else {
            $("#manageProfiles").text("Manage Profiles");
            $('.edit-section', '.child-card').fadeOut().removeClass('show-edit');
        }
	});

	var lastDeleted;
	var deletedChild;
	deleteAction = function(child_id) {
		$('#'+child_id).fadeOut({
			complete: function() {
				lastDeleted = $('#'+child_id).addClass('item-hidden');
				$('#index-undo').fadeIn();
                var index = $('#' + child_id).attr('data-slick-index');
                $('#carousel').slick('slickRemove', index);
			}
		});
	};

	findChild = function(child_id) {
		var index = -1;
		for (var i = 0; i < children.length; i++) {
			if (children[i].id == child_id) {
				index = i;
				break;
			}
		}
		deletedChild = children.splice(index,1);
	};

	var addChildBack = function() {
		if (deletedChild[0]) {
			childrenDB.child(deletedChild[0].id).set(deletedChild[0]);
		}
	};

	$("#index-undo").click(function() {
		if (lastDeleted) {
			lastDeleted.removeClass('item-hidden').fadeIn();
			$(this).fadeOut();
            $('#carousel').slick('slickAdd', lastDeleted);
			addChildBack();
		}
	});
});
