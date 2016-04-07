// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
	var data = [
		{
			name: "Star Wars Mini Light Saber - Luke Skywalker", 
			url: "http://www.toysrus.com/product/index.jsp?productId=58348356&cp=&parentPage=search",
			img_src: "../images/light_saber.jpg",
			item: "light saber"
		},
		{
			name: "Razor A Kick Scooter", 
			url: "http://www.toysrus.com/product/index.jsp?productId=34453176&cp=2255956.3053760.13041262&parentPage=search&cid=1203626",
			img_src: "../images/scooter.jpg",
			item: "scooter"
		},
		{
			name: "Crayola Washable Kid's Paint 10-Pack", 
			url: "http://www.toysrus.com/product/index.jsp?productId=2396157&cp=2255956.3053760.13041262&parentPage=search",
			img_src: "../images/paint.jpg",
			item: "paint"
		},
		{
			name: "LEGO Juniors Batman Defend the Batcave", 
			url: "http://www.toysrus.com/product/index.jsp?productId=31225216&cp=2255956.3053760.13041262&parentPage=search",
			img_src: "../images/batman.jpg",
			item: "batman"
		},
	];

	for (var i = 0; i < data.length; i++) {
		var d = data[i];
		var div_text = '<div class = "col-sm-6 col-md-3">';
		var img_text = '<div class = "thumbnail"> <img src = "' + d.img_src + '" alt = "' + d.item + 'thumbnail"> </div>';
	    var caption_text = '<div class = "caption"> <h4 class="sub">' + d.name + '</div>';
		$("#search-content").append(div_text + img_text + caption_text + '</div>');
	}
	
});