var backupArray = [
{
	"file": "01.jpg", 
	"title": "Hay Bales",
	"description": "I love hay bales. Took this snap on a drive through the countryside past some straw fields."
},
{
	"file": "02.jpg", 
	"title": "Lake",
	"description": "The lake was so calm today. We had a great view of the snow on the mountains from here."
},
{
	"file": "03.jpg", 
	"title": "Canyon",
	"description": "I hiked to the top of the mountain and got this picture of the canyon and trees below."
},
{
	"file": "04.jpg", 
	"title": "Iceberg",
	"description": "It was amazing to see an iceberg up close, it was so cold but didn’t snow today."
},
{
	"file": "05.jpg", 
	"title": "Desert",
	"description": "The red cliffs were beautiful. It was really hot in the desert but we did a lot of walking through the canyons."
},
{
	"file": "06.jpg", 
	"title": "Fall",
	"description": "Fall is coming, I love when the leaves on the trees start to change color."
},
{
	"file": "07.jpg", 
	"title": "Plantation",
	"description": "I drove past this plantation yesterday, everything is so green!"
},
{
	"file": "08.jpg", 
	"title": "Dunes",
	"description": "My summer vacation to the Oregon Coast. I love the sandy dunes!"
},
{
	"file": "09.jpg", 
	"title": "Countryside Lane",
	"description": "We enjoyed a quiet stroll down this countryside lane."
},
{
	"file": "10.jpg", 
	"title": "Sunset",
	"description": "Sunset at the coast! The sky turned a lovely shade of orange."
},
{
	"file": "11.jpg", 
	"title": "Cave",
	"description": "I did a tour of a cave today and the view of the landscape below was breathtaking."
},
{
	"file": "12.jpg", 
	"title": "Bluebells",
	"description": "I walked through this meadow of bluebells and got a good view of the snow on the mountain before the fog came in."
}
];
var imageTag = [
	'<div class="img"><img src="',
	'" alt="',
	'" onclick="',
	'"></div>'
];
var userAgent = navigator.userAgent;
var clickFunction = 'renderSpotlight()';
var imageDirectory = './img/';
var thumbDirectory = './img/Thumbnails/';
var ajaxRequest = new XMLHttpRequest();
var jsonData = './db/images.json';

function renderThumbs(thumbs) {
	var embedHTML = document.getElementById('gallery-thumbnails');
	var imgTag = '';
	embedHTML.innerHTML = '';
	for (var i = 0; i < thumbs.length; i += 1) {
		imgTag += imageTag[0];
		imgTag += thumbDirectory + thumbs[i].file;
		imgTag += imageTag[1];
		imgTag += thumbs[i].title;
		imgTag += imageTag[2];
		imgTag += clickFunction;
		imgTag += imageTag[3];
	}
	embedHTML.innerHTML += imgTag;
}

function renderSpotlight() { 
	console.log('stubbed function - you need to add lightbox functionality');
	//Add lightbox
	//change css of hidden lightbox to display: whatever
	//<img src=""
}

function ajaxCall() {
	ajaxRequest.open("GET", jsonData, true);
	ajaxRequest.send();
}

ajaxRequest.onload = function(){
	if (ajaxRequest.readyState == 4 && ajaxRequest.status == 200) {
		var imageList = JSON.parse(ajaxRequest.responseText);
		renderThumbs(imageList);
	}
}

document.getElementById("search-field").addEventListener("input", function(){
	if (userAgent.indexOf('Firefox') >= 0) {
		var imageList = JSON.parse(ajaxRequest.responseText);
	} else {
		var imageList = backupArray;
	}
	var filteredList = [];
	for (var i = 0; i < imageList.length; i += 1) {
		if (imageList[i].title.toLowerCase().indexOf(this.value.toLowerCase()) >= 0) {
			filteredList.push(imageList[i]);
		}
	renderThumbs(filteredList);
	}
});

if (userAgent.indexOf('Firefox') >= 0) {
	ajaxCall();
} else {
	renderThumbs(backupArray);
}