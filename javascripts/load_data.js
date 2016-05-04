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
			}],
			tags:{
				"star wars": true,
				"light saber":true,
				"wand":true,
				"luke skywalker":true,
				"light":true,
				"lights":true,
				"flashlight":true,
				"cosplay":true
				}
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
			}],
			tags:{
				"biking":true,
				"scooter":true,
				"outdoors":true,
				"active":true,
				}
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
			}],
			tags:{
				"art":true,
				"arts & crafts": true,
				"crafts": true,
				"crafting": true,
				"drawing": true,
				"painting": true,
			}
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

			}],
			tags:{
				"lego":true,
				"batman":true,
				"legos":true,
				"building":true,
				"engineering":true,
				"action figures":true,
			}
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
			}],
			tags:{
				"arts":true,
				"arts & crafts": true,
				"painting": true,
				"coloring": true
			}
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
			}],
			tags:{
				"star wars":true,
				"legos":true,
				"lego":true,
				"building":true,
				"engineering":true
			}
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
			}],
			tags:{
				"blaster":true,
				"games":true,
				"fighting":true,
				"darts":true,
			}
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
			}],
			tags:{
				"lego":true,
				"legos":true,
				"building":true,
				"engineering":true,
				"star wars":true,
				"action figures":true,
				"action figure":true
			}
		},
		{
			id:8,
			name: "Hot Wheels Lights", 
			url: "http://www.toysrus.com/product/index.jsp?productId=29285276&cp=2255956.2273442.2255971.3252102.57486126.57521716&parentPage=family",
			img_src: "../images/hot_wheels.jpg",
			item: "hot wheels",
			price: 13.59,
			rating: 5,
			seller: "Toys-R-Us",
			description:"Bringing lights & sounds excitement to classic Hot Wheels cars. Buckle up and let your imagination run wild driving will never be the same!",
			age:"3+",
			notes:"",
			reviews:[{
				summary:"Great Toy",
				content:"I bought this for my two year old daughter because she saw it in the store. She is now turning four and it is still one of her favorite toys.",
				author:"handyman2722",
				author_desc:"Parent Of Two Or More Children",
				rating:5
			},
			{
				summary:"Son loves it",
				content:"Great, inexpensive, awesome car! The quality for the price is perfect. The chomping it makes as it drives around is hilarious. My son loves it. Big hit on Christmas morning.",
				author:"BugABoo",
				author_desc:"First Time Parent",
				rating:5
			}],
			tags:{
				"cars":true,
				"hot wheels":true,
				}
		},
		{
			id:9,
			name: "Code Master Logic Game", 
			url: "http://www.amazon.com/Code-Master-Programming-Logic-Game/dp/B014993TCI/ref=sr_1_1?s=toys-and-games&ie=UTF8&qid=1462224326&sr=1-1&keywords=coding",
			img_src: "../images/code_master.jpg",
			item: "code master",
			price: 20.99,
			rating: 4.8,
			seller: "Amazon",
			description:"The ultimate coding board game. Teaches basic to complex coding concepts",
			age:"8+",
			notes:"",
			reviews:[{
				summary:"awesome game",
				content:"The game itself is absolutely awesome- very challenging, very fun. It ramps up in difficulty very smoothly- and my 6 year old was able to play it no problem.",
				author:"solidwhetstone",
				author_desc:"Verified Purchase",
				rating:4
			},
			{
				summary:"Educational game",
				content:"This is a great intro to coding for kids because it's something tangible they can see and feel, where coding is usually a strictly digital thing that can be hard for kids to wrap their minds around at first. Great concept!",
				author:"Emily Evert",
				author_desc:"Verified Purchase",
				rating:5
			},
			{
				summary:"It is easy to figure out",
				content:"This game creates a 'gaming' atmosphere without having him stare at a screen. He has to use logic and problem solving skills. It is easy to figure out, without a ton of directions (so it kept his interest right off the bat), but it gets challenging so it can keep him entertained for a while.",
				author:"KB",
				author_desc:"Verified Purchase",
				rating:5
			}],
			tags:{
				"coding":true,
				"logic":true,
				"educational":true,
				"technology":true,
				"board games":true,
				"board game":true,
				"problem solving":true
				}
		},
		{
			id:10,
			name: "littleBits Electronics Arduino Coding Kit", 
			url: "http://www.amazon.com/littleBits-Electronics-Arduino-Coding-Kit/dp/B00KQ0HQZG/ref=sr_1_2?s=toys-and-games&ie=UTF8&qid=1462224326&sr=1-2&keywords=coding",
			img_src: "../images/arduino.jpg",
			item: "arduino kit",
			price: 88.99,
			rating: 3.9,
			seller: "Amazon",
			description:"Snap modules easily to 3 inputs and 3 outputs on the Arduino module, as well as additional I/O for advanced hardware interaction",
			age:"14+",
			notes:"",
			reviews:[{
				summary:"Alot of fun!",
				content:"The Arduino kit is alot of fun. I mostly use it with the LittleBits Korg Synth Kit. I have a couple of projects at littlebits.cc that use the LittleBits Arduino.",
				author:"mrpeter58",
				author_desc:"",
				rating:5
			},
			{
				summary:"Fun way to learn code",
				content:"I've been a developer for a long time but never used arduino. This is by far the most fun I've had coding in a long time. It's hard to mess up and easy to make hardware do neat stuff! I'd say this is good for age 8+",
				author:"Julian",
				author_desc:"",
				rating:5
			},
			{
				summary:"Awful, every good review is wrong!",
				content:"I'm the kid who got the present, and let me say it is the worst thing ever! When you go online to see the projects that other people made with the arduino, you need to buy at least an extra $50 worth of parts. It doesn't come with enough materials, cauising you to speend more money. ",
				author:"Mrs Smith",
				author_desc:"",
				rating:1
			}],
			tags:{
				"coding":true,
				"logic":true,
				"educational":true,
				"technology":true,
				"problem solving":true,
				"arduino":true,
				"electronics":true,
				"hardware":true,
				}
		},
		{
			id:11,
			name: "Makey Makey - An Invention Kit for Everyone", 
			url: "http://www.amazon.com/Makey-Invention-Kit-Everyone/dp/B008SFLEPE/ref=sr_1_4?s=toys-and-games&ie=UTF8&qid=1462224326&sr=1-4&keywords=coding",
			img_src: "../images/invention_kit.jpg",
			item: "invention kit",
			price: 49.95,
			rating: 4.6,
			seller: "Amazon",
			description:"Turn everyday objects like bananas into touchpads! Connect the world around you to your computer! Setup takes just seconds.",
			age:"8+",
			notes:"",
			reviews:[{
				summary:"So fun, so easy, so cool!",
				content:"At my University I gave this to students. They had so much fun that, well, I'm not getting it back anytime soon.",
				author:"MarkC",
				author_desc:"",
				rating:5
			},
			{
				summary:"Impressive!",
				content:"Wow! This thing is great. My kids ages 4 and 9, LOVE this so much. The instructions had great starter ideas that really inspired them. Now all they do is try to come up with ideas. Highly recommended!",
				author:"Tony R.L.",
				author_desc:"",
				rating:5
			},
			{
				summary:"Lots of quick easy fun.",
				content:"This is great. The kids have a lot of fun playing online flash games with improvised controllers. The only shortcoming is that since a human is always involved, you either have to hold one end of a banana clip or somehow attach it to your body.",
				author:"Jonathan Ashbrook",
				author_desc:"Verified purchase",
				rating:4
			}],
			tags:{
				"coding":true,
				"logic":true,
				"educational":true,
				"technology":true,
				"problem solving":true,
				"invention":true,
				"games":true,
				"computers":true,
				"computer":true,
				}
		},
			{
			id:12,
			name: "Aurora 0 World Lil Benny Phant", 
			url: "http://www.amazon.com/Aurora-World-Benny-Phant-Plush/dp/B00SUEEFOK/ref=sr_1_5?s=toys-and-games&ie=UTF8&qid=1462225512&sr=1-5&keywords=stuffed+animals",
			img_src: "../images/elephant_plus.jpg",
			item: "elephant plush",
			price: 10.17,
			rating: 4.9,
			seller: "Amazon",
			description:"Super-soft plush and huggable body. Endearing facial expression and body position",
			age:"1-15",
			notes:"",
			reviews:[{
				summary:"Adorable!",
				content:"much bigger than i thought it would be but its very adorable",
				author:"Mother of 2 Angels",
				author_desc:"",
				rating:5
			},
			{
				summary:"So cute!",
				content:"So cute! He's very soft. His arms are a little softer than his legs, so it positions well into the sitting position pictured in the product page.",
				author:"M. Gregory",
				author_desc:"Verified purchase",
				rating:5
			},
			{
				summary:"Sweet",
				content:"Really sweet Soft and fllexible.. Bought one for a toddler after reading and being satisfied with the safety comments. A certain family member loved it and wanted to keep it, and i had to buy another for the toddler.",
				author:"rs",
				author_desc:"Verified purchase",
				rating:5
			}],
			tags:{
				"stuffed animal":true,
				"stuffed animals":true,
				"plush":true,
				"stuffed animals":true,
				"cuddles":true,
				"cuddly":true,
				"elephant":true,
				"elephants":true,
				"animal":true,
				"animals":true,
				"soft":true,
				}
		},
			{
			id:13,
			name: "Dawn of Justice Superman Action Figure", 
			url: "http://www.walmart.com/ip/DO-NOT-PUBLISH-Batman-vs.-Superman-Multiverse-Superman-Action-Figure/44932415?reviews_limit=10&",
			img_src: "../images/superman.jpg",
			item: "superman",
			price: 29.99,
			rating: 0,
			seller: "Walmart",
			description:"Celebrate the new Batman v Superman: Dawn of Justice movie and The Greatest Superhero Battle of All Time with six-inch figures of key characters featuring 20 points of articulation. Collect them all and connect the included pieces to build a themed replica weapon with a display base. Each sold separately, subject to availability.",
			age:"3+",
			notes:"This toy is not suitable for ages under 3 years. It contains one or more of the following items: marbles, small ball, or small parts.",
			reviews:[],
			tags:{
				"action figure":true,
				"action figures":true,
				"DC":true,
				"comic":true,
				"superman":true,
				"batman":true,
				"movies":true,
				"doll":true,
				"superhero":true,
				"tv":true,
				}
		},
			{
			id:14,
			name: "12\" Kawasaki Kids' Bike with Training Wheels", 
			url: "http://www.walmart.com/ip/Kawasaki-12-Kids-Bicycle-with-Training-Wheels/11064959?reviews_limit=10&",
			img_src: "../images/bike.jpg",
			item: "bike",
			price: 63.35,
			rating: 3.8,
			seller: "Walmart",
			description:"This 12\" kids' bike is the ideal way to introduce your little one to riding and it is easy to assemble, requiring minimal tools.",
			age:"2-7",
			notes:"",
			reviews:[{
				summary:"Perfect for our 3 yr old!",
				content:"The bicycle arrived quickly and all pieces were in perfect order. My husband and I assembled it, together, in less than an hour. It is light weight, but feels and looks like a high quality bike. I love the full chain guard which will protect my overly curious toddler. She wanted a boys themed bike that she saw in the store, but we wanted something a little more feminine for her that didn't have a character on it. This bike is perfect for a Tom-boy. Pretty, but not the typical pink and purple! She loves it! She is only 3 and is able to ride it quite well all by herself. We are very pleased with this purchase! We may buy another for her little brother in a few years.",
				author:"LeiaMom",
				author_desc:"Verified Purchaser",
				rating:5
			},
			{
				summary:"Too cute",
				content:"This bike was easy to assemble, looks nice and rides well. The colors are cute but not too over the top. We have only ridden it inside so far but we love it.",
				author:"DDDD",
				author_desc:"",
				rating:5
			},
			{
				summary:"Bike was a hit with the kids.",
				content:"Bike was easy for first time rider. Durable, easy to handle.",
				author:"Bikefor2",
				author_desc:"Verified Purchaser",
				rating:5
			}],
			tags:{
				"biking":true,
				"bikes":true,
				"outside":true,
				"bike":true,
				"young":true,
				"kids":true,
				"active":true,
				"healthy":true,
				"bicycle":true,
				"bicycles":true,
				"Kawasaki":true,
				}
		},
			{
			id:15,
			name: "Kawasaki KX12 12\" Boys Bike", 
			url: "http://www.walmart.com/ip/Kawasaki-12-Monocoque-Boys-Bicycle/12575682?reviews_limit=10&",
			img_src: "../images/boys-bike.jpg",
			item: "boys-bike",
			price: 79.99,
			rating: 2.8,
			seller: "Walmart",
			description:"Give your child the memorable experience that every little boy or girl should have with this youth bike. Kids will enjoy riding around the driveway or with their neighborhood friends.",
			age:"2-5",
			notes:"",
			reviews:[{
				summary:"",
				content:"i bought this bike for my sons birthday and when i got it, it was not what i expected. it was verry cheeply made for the brand and price you pay for it so i guess all you doing is paying for the name. the rims were bent on both tires and the bresks were mested up on it and to top it off it came with a bell that brok off as soon as you touch it..",
				author:"kockler",
				author_desc:"",
				rating:3
			},
			{
				summary:"Perfect for my Little Man",
				content:"My 2 year old seems to love it, I'm just not quite sure about a hand brake for such a little man. A little confusing ,but I think He'll get the hang of it.",
				author:"1stCaptain",
				author_desc:"",
				rating:4
			}],
			tags:{
				"biking":true,
				"bikes":true,
				"outside":true,
				"bike":true,
				"young":true,
				"kids":true,
				"active":true,
				"healthy":true,
				"bicycle":true,
				"bicycles":true,
				"Kawasaki":true,
				}
		},
			{
			id:16,
			name: "Spalding NBA Street Basketball", 
			url: "http://www.walmart.com/ip/Spalding-NBA-Street-Basketball/10741221?reviews_limit=10&",
			img_src: "../images/basketball.jpg",
			item: "basketball",
			price: 11.90,
			rating: 4.6,
			seller: "Walmart",
			description:"The Spalding 63250 official size NBA street Basketball offers great feel and grip to make your game more exciting. This outdoor basketball is available in two sizes- 28.5 inch for intermediate and the NBA official size of 29.5 inch.",
			age:"All ages",
			notes:"",
			reviews:[{
				summary:"Best Rubber Basketball on the market today",
				content:"I have 3 boys and I've played and coached basketball for 40 years and this is the best rubber basketball available today. I've tried every brand and multiple versions indoor/outdoor balls from every manufacturer but this Spalding NBA \"Street\" ball holds its grip forever. If you are playing outside on concrete there is no other ball to consider. Most of the inside/outside balls are great for inside but once you take them on the concrete you can forget about that nice tacky grip. This ball holds its grip forever and is the least expensive ball out there. Run, don't walk to get this ball if you can find it for under $15. I bought 3 simply because I know how often manufacturers change \"designs\" and are likely to ruin a good thing. You won't be disappointed with this inexpensive and yet very grippy outdoor basketball.",
				author:"crowded6",
				author_desc:"Verified Purchaser",
				rating:5
			},
			{
				summary:"Great, durable ball",
				content:"Our 9 year old son wanted a basketball for Xmas. My husband wanted it to be a special-grip one. This is the ball. It's durable, and our son loves it. He noticed the special grip right away and thinks it's a fabulous aspect. Our kids would play basketball all day long if they could, and this ball stands up to all their playtime.",
				author:"KDMtry",
				author_desc:"",
				rating:5
			},
			{
				summary:"Great Outdoor Ball",
				content:"I purchased this basketball for outdoor use. I'm in my 30s and was looking for a basketball to use at the court at the park. I was impressed with the grip this ball has, even after use. As it gets dirty, it looses some of its grip, but if you'll just wipe it off with a damp cloth, it'll almost be like new. It also has good bounce, and holds air well.",
				author:"KDMtry",
				author_desc:"",
				rating:4
			}],
			tags:{
				"basketball":true,
				"bball":true,
				"outdoors":true,
				"nba":true,
				"hoops":true,
				"hoop":true,
				"sports":true,
				"healthy":true,
				"team":true,
				"spalding":true,
				"sporty":true,
				"ball":true
				}
		},
		{
			id:17,
			name: "Wilson Sporting Goods Traditional Black/White Soccer Ball, Size 3", 
			url: "http://www.walmart.com/ip/Wilson-Traditional-Black-White-Soccer-Ball-Size-3/27104388?reviews_limit=10&	",
			img_src: "../images/soccer.jpg",
			item: "soccer",
			price: 12.47,
			rating: 5,
			seller: "Walmart",
			description:"This Wilson Sporting Goods product is made with high-quality materials to improve your game!",
			age:"All ages",
			notes:"",
			reviews:[{
				summary:"Shafee's SOCCER BALL Review",
				content:"I have a regulation size BADEN black and white soccer ball- the classic! Bought this \"Wilson Traditional Black/White Soccer Ball, Size 3\" as a gift and it was delivered on time. The feel and texture is comfortable. I wanted to keep it for myself, but like I said, this was gift. Feels expensive to the touch when it is brand new, but the shiny gloss will eventually wear off with usage and time. Great for children, and even adults who want to play \"hack-sack\" with a bigger and firm soccer ball.",
				author:"SHAFEE",
				author_desc:"",
				rating:5
			},
			{
				summary:"My son loved it.",
				content:"Great.",
				author:"Danared409",
				author_desc:"",
				rating:5
			}],
			tags:{
				"soccer":true,
				"soccer ball":true,
				"outdoors":true,
				"ball":true,
				"goal":true,
				"classic":true,
				"sports":true,
				"healthy":true,
				"team":true,
				"wilson":true,
				"sporty":true,
				"sport":true
				}
		},
		{
			id:18,
			name: "Fisher Price Musical Lion Walker", 
			url: "http://www.walmart.com/ip/Fisher-Price-Musical-Lion-Walker/23583152",
			img_src: "../images/lion_walker.jpg",
			item: "lion_walker",
			price: 19.99,
			rating: 4,
			seller: "Walmart",
			description:"Sturdy, lion character themed walker",
			age:"6mths+",
			notes:"",
			reviews:[{
				summary:"Shafee's SOCCER BALL Review",
				content:"my grandaughter loves the lion head and the music. she dances to it....it does still flip over for toddlers just learning to walk ",
				author:"kajnqtnana46",
				author_desc:"",
				rating:5
			},
			{
				summary:"Do not recommend at all!!!!!",
				content:"I'm extremely disappointed, fisher price at usually a good company But this item is horrible!!!!! At this stage you need to control the baby's walking and this walker does Not have the stages you need so they don't fall on their face",
				author:"Beth",
				author_desc:"",
				rating:2
			},
			{
				summary:"Great",
				content:"My 7 mouth love it and I do too",
				author_desc:"",
				rating:5
			}],
			tags:{
				"walking":true,
				"toddler":true,
				"baby":true,
				"lion":true,
				"learning":true,
				"young":true,
				"walker":true
				}
		},
		{
			id:19,
			name: "Goldie Flopsie", 
			url: "http://www.amazon.com/Aurora-Plush-31117-Goldie-Flopsie/dp/B00124X5YQ/ref=sr_1_6?s=toys-and-games&ie=UTF8&qid=1462322553&sr=1-6&keywords=stuffed+animals",
			img_src: "../images/stuffed_dog.jpg",
			item: "goldie",
			price: 10.02,
			rating: 4.6,
			seller: "Amazon",
			description:"Realistic styling. Wonderful gift item. Fine plush fabric. Soft and cuddly",
			age:"36mths+",
			notes:"",
			reviews:[{
				summary:"Mom's new puppy",
				content:"Toys aren't for kids any more. My mother is 86 and has dementia/Alzheimer's. She spends hours talking to her furry little friends and they are a great comfort to her while I'm away at work. The Aurora plush puppies are especially soft, huggable and realistic.",
				author:"A. Slocum",
				author_desc:"",
				rating:5
			},
			{
				summary:"5.0 out of 5 starsBaby pup is 'pure gold.'",
				content:"I have a photography studio. I bought a huge bear, then a huge golden retriever from your company. When I saw the little pup I couldn't resist. The children that come in for pictures won't set him down. They just love to hold him. Thanks.",
				author:"Mary H. Dunaway",
				author_desc:"",
				rating:5
			}],
			tags:{
				"stuffed animal":true,
				"stuffed animals":true,
				"dog":true,
				"animal":true,
				"dogs":true,
				"animals":true,
				"cuddles":true,
				"cuddly":true,
				"soft":true
				}
		},
		{
			id:20,
			name: "Sweet and Softer Perky Penguin", 
			url: "http://www.amazon.com/Aurora-World-Sweet-Softer-Penguin/dp/B00B4WJB26/ref=sr_1_14?s=toys-and-games&ie=UTF8&qid=1462322553&sr=1-14&keywords=stuffed+animals",
			img_src: "../images/penguin.jpg",
			item: "perky",
			price: 10.68,
			rating: 4.9,
			seller: "Amazon",
			description:"9.5\" overall height, standing position. Silky soft two-tone plush that is sweet to the touch. Made with high quality materials and lock washer eyes for safety.",
			age:"36mths+",
			notes:"",
			reviews:[{
				summary:"Large, fluffy, and adorable",
				content:"The kids love it. It is quite large but I think it's perfect for snuggling with and carrying around. They play all kinds of penguin games with this one.",
				author:"D. Lee",
				author_desc:"",
				rating:5
			},
			{
				summary:"Penguin",
				content:"I have a growing collection of plush penguins and this was a great addition. Very cute and soft. I would recommend it.",
				author:"C-Mix",
				author_desc:"",
				rating:5
			},
			{
				summary:"I love it",
				content:'I bought this for my girlfriend for Valentine\'s day, because she likes penguins a lot. She is telling me to write this review right now -- "this penguin is the softest, roundest, most cuddliest little thing ever. When you move it\'s arms, it makes cute expressions and makes you want to hug it. I love it."',
				author:"Kimberly Blythe",
				author_desc:"",
				rating:5
			}],
			tags:{
				"stuffed animal":true,
				"stuffed animals":true,
				"peguins":true,
				"animal":true,
				"penguin":true,
				"animals":true,
				"cuddles":true,
				"cuddly":true,
				"soft":true
				}
		},
	];

	var rootRef = new Firebase("https://toychest.firebaseio.com/");
	rootRef.child("items").set(data);

})