// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	var data = [
		{
			name: "Star Wars Mini Light Saber - Luke Skywalker", 
			url: "http://www.toysrus.com/product/index.jsp?productId=58348356&cp=&parentPage=search",
			img_src: "../images/light_saber.jpg",
			item: "light saber",
			price: 6.99,
			rating: 5,
			seller: "Toys-R-Us",
		},
		{
			name: "Razor A Kick Scooter", 
			url: "http://www.toysrus.com/product/index.jsp?productId=34453176&cp=2255956.3053760.13041262&parentPage=search&cid=1203626",
			img_src: "../images/scooter.jpg",
			item: "scooter",
			price: 29.99,
			rating: 4.4,
			seller: "Toys-R-Us",
		},
		{
			name: "Crayola Washable Kid's Paint 10-Pack", 
			url: "http://www.toysrus.com/product/index.jsp?productId=2396157&cp=2255956.3053760.13041262&parentPage=search",
			img_src: "../images/paint.jpg",
			item: "paint",
			price: 4.99,
			rating: 4.5,
			seller: "Toys-R-Us",
		},
		{
			name: "LEGO Juniors Batman Defend the Batcave", 
			url: "http://www.toysrus.com/product/index.jsp?productId=31225216&cp=2255956.3053760.13041262&parentPage=search",
			img_src: "../images/batman.jpg",
			item: "batman",
			price: 29.99,
			rating: 4.7,
			seller: "Toys-R-Us",
		},
		{
			name: "Crayola Color Wonder - Fingerprints & Paper",
			url: "http://www.toysrus.com/product/index.jsp?productId=3365208&ab=TRU:thome2_rr:Shoppers%20like%20you%20also%20liked:4",
			img_src: "../images/color_fingers.jpg",
			item: "color fingers",
			price: 8.99,
			rating: 4.3,
			seller: "Toys-R-Us",
		},
		{
			name: "LEGO Star Wars Kylo Ren's Command Shuttle",
			url: "http://www.toysrus.com/product/index.jsp?productId=57582706&ab=TRU:thome3_rr:Now%20Trending:2",
			img_src: "../images/kyloren.jpg",
			item: "kylo ren",
			price: 108.99,
			rating: 4.6,
			seller: "Toys-R-Us",
		},
		{
			name: "NERF N-Strike Elite Rhino-Fire Blaster",
			url: "http://www.toysrus.com/product/index.jsp?productId=46534416",
			img_src: "../images/fireblaster.jpg",
			item: "fire blaster",
			price: 99.99,
			rating: 4.1,
			seller: "Toys-R-Us",
		},
		{
			name: "LEGO Star Wars Obi-Wan Kenobi",
			url: "http://www.toysrus.com/product/index.jsp?productId=57582636&ab=TRU:thome2_rr:Shoppers%20like%20you%20also%20liked:5",
			img_src: "../images/obiwan.jpg",
			item: "obi wan",
			price: 26.99,
			rating: 4.6,
			seller: "Toys-R-Us",
		}
	];

	for (var i = 0; i < data.length; i++) {
		var d = data[i];
		var div_text = '<div id="item-wrapper-'+i+'"class = "col-sm-6 col-md-3 item-wrapper" data-toggle="modal" data-target="#myModal">';
		var img_text = '<div class = "thumbnail"> <img src = "' + d.img_src + '" alt = "' + d.item + 'thumbnail"> </div>';
	    var caption_text = '<div class = "caption"> <h4 class="sub">' + d.name + '</div>';
		$("#search-content").append(div_text + img_text + caption_text + '</div>');
	}

	$(".item-wrapper").click(function(event) {
		var index = parseInt(event.toElement.id.split("-")[2]);
		var elem = $("#"+event.toElement.id);
		var src = elem.find(".thumbnail").find("img").attr("src");
		$("#modal-thumbnail").html("<img src='" + src +"'</div>");
		$(".modal-title").text(elem.find(".caption").text());
		$("#modal-price").text("$"+data[index].price);
		$("#seller").text(data[index].seller);
	});

	$(".shaded-star").addClass("filled");
	
});