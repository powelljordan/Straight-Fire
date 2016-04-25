$(function() {
		var data = [
		{
			id:0,
			name: "Star Wars Mini Light Saber - Luke Skywalker", 
			url: "http://www.toysrus.com/product/index.jsp?productId=58348356&cp=&parentPage=search",
			img_src: "../images/light_saber.jpg",
			item: "light saber",
			price: 6.99,
			rating: 5,
			seller: "Toys-R-Us",
			description:"Flashlights with aspirational design and unique light up features. Mini light sabers designs with powerful LED flashlight and spring loaded light up blade. Has special swivel clip for attaching to belts and backpacks.",
			age:"3-10",
			notes:"",
			reviews:[{
				summary:"ok",
				content:"it was ok",
				author:"jojoy",
				author_desc:"",
				rating:5
			}]
		},
		{
			id:1,
			name: "Razor A Kick Scooter", 
			url: "http://www.toysrus.com/product/index.jsp?productId=34453176&cp=2255956.3053760.13041262&parentPage=search&cid=1203626",
			img_src: "../images/scooter.jpg",
			item: "scooter",
			price: 29.99,
			rating: 4.4,
			seller: "Toys-R-Us",
			description: "Young riders will adore the sporty look and feel of the Razor A Kick Scooter, which features urethane wheels for reliable performance and a rear fender brake for secure stops. The aluminum T-tube/deck is strong and lightweight, and the foam grips and adjustable handlebar height help riders stay comfortable. The folding down-tube makes the scooter simple to carry and store.",
			age: "5+",
			notes:"",
			reviews:[{
				summary:"Great scooter",
				content:"Bought for my granddaughter. She is 4 and it helping her learn to balance",
				author:"MJB",
				author_desc: "Adult",
				rating:5
			},
			{
				summary:"Smoothest bike",
				content:"Great and smooth bike, and fantastic color for kids.",
				author:"Very smooth",
				author_desc:"Student",
				rating:5
			}]
		},
		{
			id:2,
			name: "Crayola Washable Kid's Paint 10-Pack", 
			url: "http://www.toysrus.com/product/index.jsp?productId=2396157&cp=2255956.3053760.13041262&parentPage=search",
			img_src: "../images/paint.jpg",
			item: "paint",
			price: 4.99,
			rating: 4.5,
			seller: "Toys-R-Us",
			description:"Set includes 10 different colors of washable kid's paint in 2 oz. Plastic bottles.",
			age:"3+",
			notes:"",
			reviews:[{
				summary:"I would buy this product again.",
				content:"Great colors - very washable - great for the little artists... would be 5 stars if they also came in a package that you could tote them around in.",
				author:"The Nana",
				author_desc:"Daycare Provider/ Educator",
				rating:4

			}]
		},
		{
			id:3,
			name: "LEGO Juniors Batman Defend the Batcave", 
			url: "http://www.toysrus.com/product/index.jsp?productId=31225216&cp=2255956.3053760.13041262&parentPage=search",
			img_src: "../images/batman.jpg",
			item: "batman",
			price: 29.99,
			rating: 4.7,
			seller: "Toys-R-Us",
			description:"This Easy to Build set has all you need to develop your child's building skills. Create a world of iconic super heroes and villains, from the giant archway to the cell for holding bad guys. Includes 3 minifigures: Batman, Robin and The Joker with assorted weapons.",
			age:"4-7",
			note:"CHOKING HAZARD - Small parts. Not for children under 3 yrs.",
			reviews:[{
				summary:"Creative play for young children",
				content:"This provides creative play for young children.",
				author:"ken",
				author_desc:"",
				rating:4
			},
			{
				summary:"Grandson loves it",
				content:"4 year old grandson loved it, especially the jail part. Has played with it every time he comes to our house.",
				author:"Jjmac",
				author_desc:"Grandparent",
				rating:4
			},
			{
				summary:"Junior perfect for small hands.",
				content:"5 year able to do completely on his own. He loves these and good for the independent child.",
				author:"Mooseberg",
				author_desc:"Education Oriented",
				rating:5

			}]
		},
		{
			id:4,
			name: "Crayola Color Wonder - Fingerprints & Paper",
			url: "http://www.toysrus.com/product/index.jsp?productId=3365208&ab=TRU:thome2_rr:Shoppers%20like%20you%20also%20liked:4",
			img_src: "../images/color_fingers.jpg",
			item: "color fingers",
			price: 8.99,
			rating: 4.3,
			seller: "Toys-R-Us",
			description:"Crayola's new Color Wonder Fingerpaints provide Moms with a mess-free solution to fingerpainting. It's fast-drying, new formulation acts & feels like real fingerpaint only it's mess-free! 5 vibrant colors & 12 double wide sheets of color wonder paper are included.",
			age:"3+",
			notes:"",
			reviews:[{
				summary:"Mess free",
				content:"Mess free finger paint. Good for travel.",
				author:"Mom",
				author_desc:"Value Oriented",
				rating:4
			},{
				summary:"My son enjoys it",
				content:"My son has enjoyed this finger painting set and I like that the colors won't get all over. The gel paints can still get on stuff but so far it's been easy to clean up.",
				author:"Beckie",
				author_desc:"Value Oriented",
				rating:5
			}]
		},
		{
			id:5,
			name: "LEGO Star Wars Kylo Ren's Command Shuttle",
			url: "http://www.toysrus.com/product/index.jsp?productId=57582706&ab=TRU:thome3_rr:Now%20Trending:2",
			img_src: "../images/kyloren.jpg",
			item: "kylo ren",
			price: 108.99,
			rating: 4.6,
			seller: "Toys-R-Us",
			description:"Includes 6 minifigures with assorted weapons and accessories: Kylo Ren, General Hux, First Order Officer, 2 First Order Crew and a First Order Stormtrooper Officer.",
			age:"9-14",
			notes:"",
			reviews:[{
				summary:"Legos will never go away",
				content:"It looks just like the ship in the movie. My son will have hours of fun putting it together and playing with it.",
				author:"Jaime",
				author_desc:"Parent of Two or More Children, Working Parent",
				rating:5
			},
			{
				summary:"yes, great product!",
				content:"My son loves it!!!",
				author:"bbcbob",
				author_desc:"Collector, Education Oriented, First Time Parent, Working Parent",
				rating:5
			}]
		},
		{
			id:6,
			name: "NERF N-Strike Elite Rhino-Fire Blaster",
			url: "http://www.toysrus.com/product/index.jsp?productId=46534416",
			img_src: "../images/fireblaster.jpg",
			item: "fire blaster",
			price: 99.99,
			rating: 4.1,
			seller: "Toys-R-Us",
			description: "Blaster comes with two 25-dart drums, 50 Elite darts, tripod and instructions.",
			age: "8+",
			notes: "6 D batteries are required (not included)",
			reviews: [{
				summary:"Great addition to Nerf gun collection",
				content:"My son loves this as it holds lots of ammo, doesn't get stuck when in rapid fire mode & unique with the stand. It's pricey, though...",
				author:"Cookiemb",
				author_desc: "Parent of Two or More Children, Working Parent",
				rating: 5
			},
			{
				summary:"Too expensive and does not work.",
				content:"We waited 3 months for this gun to be shipped to us. My son was so excited to finally get it. And it doesn't even work properly. The bullets get stuck every time you shoot it. It does not work properly. Very disappointing for the cost.",
				author:"Disappointed mom",
				author_desc:"Education Oriented, Parent of Two or More Children",
				rating:1
			},
			{
				summary:"Nerf Rhino is great gun for kids!",
				content:"Love everything about this gun. It is easy to load, bullets don't get stuck as they used to in older Nerf Guns. Shooting a person maybe uncomfortable for your mom or grenny but it is definitely fun.",
				author:"Smax24",
				author_desc:"",
				rating:5
			}
			]
		},
		{
			id:7,
			name: "LEGO Star Wars Obi-Wan Kenobi",
			url: "http://www.toysrus.com/product/index.jsp?productId=57582636&ab=TRU:thome2_rr:Shoppers%20like%20you%20also%20liked:5",
			img_src: "../images/obiwan.jpg",
			item: "obi wan",
			price: 26.99,
			rating: 4.6,
			seller: "Toys-R-Us",
			description: "Command the Clone Army against the Separatists with buildable Obi-Wan Kenobi. With durable, fully posable limbs, special white Clone armor, fabric cape, buildable blue Lightsaber and a holster with extra Lightsaber handle, this LEGO® Jedi Master is ready for tough action play!",
			age: "7-12",
			notes: "",
			reviews: [{
				summary:"Perfect Birthday gift",
				content:"My son picked this for his birthday present. It's larger than we thought which is always a plus. He loves Lego's and action figures so this was perfect",
				author:"Johnny",
				author_desc:"Parent",
				rating:5
			},
			{
				summary:"I would purchase other like this",
				content:"My son purchased this item with his birthday money. He loved it. Put it together has soon as we got home.",
				author:"Mom of a lego fan",
				author_desc:"Parent",
				rating:5
			},
			{
				summary:"Fun toy",
				content:"My boys love this series of LEGOs. The pieces are a good size and the figure can be put together rather quickly.",
				author:"MommaPY",
				author_desc:"Parent",
				rating:4
			},
			{
				summary:"Grandson loved it",
				content:"Was gift for grandson",
				author:"gigi",
				author_desc:"Parent",
				rating:5
			}]
		}
	];

	var rootRef = new Firebase("https://toychest.firebaseio.com/");
	rootRef.child("items").set(data);

})