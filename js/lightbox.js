//backupArray is only here to get around the issue where the ajax request isn't properly processed since it's not hosted on a webserver [otherwise this page wont work in Chrome, IE, or Edge]
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
var lightTag = [
	'<div id="container"><div id="left-arrow" onclick="prevSib(event)">',
	'&#10151;</a></div><div id="image"><img id="lightbox-image" src="',
	'"></div><div id="right-arrow" onclick="nextSib(event)">',
	'&#10151;</div><p id="lightbox-description">',
	'</p></div>'
];
var userAgent = navigator.userAgent;
var clickFunction = 'showSpotlight(this)';
var hideFunction = 'hideSpotlight()';
var imageDirectory = './img/';
var thumbDirectory = './img/Thumbnails/';
var jsonData = './db/images.json';
var ajaxRequest = new XMLHttpRequest();
var lightboxPosition;
var lightboxLength;
var lightboxList;

function renderThumbs(thumbs) { //could have streamlined hidden spotlight images into page
	lightboxList = thumbs;
	lightboxLength = thumbs.length - 1;
	var embedHTML = document.getElementById('gallery-thumbnails');
	var galleryContent = '';
	embedHTML.innerHTML = '';
	for (var i = 0; i < thumbs.length; i += 1) {
		galleryContent += imageTag[0];
		galleryContent += thumbDirectory + thumbs[i].file;
		galleryContent += imageTag[1];
		galleryContent += thumbs[i].title;
		galleryContent += imageTag[2];
		galleryContent += clickFunction;
		galleryContent += imageTag[3];
	}
	embedHTML.innerHTML += galleryContent;
}

function showSpotlight(image) { //could have done better with the lightTag variable and cut out the 'prevSib()' and 'nextSib()' functions and made them their own variables -- can be hard to follow all the mashups without cross-comparing lightTag and showSpotlight()
	var embedHTML = document.getElementById('lightbox');
	var lightboxContent = '';
	for (var i = 0; i < lightboxList.length; i += 1) {
		if (image.alt.indexOf(lightboxList[i].title) >= 0) {
			var lightboxImage = lightboxList[i];
			lightboxPosition = i;
			lightboxContent += lightTag[0];
			lightboxContent += lightTag[1];
			lightboxContent += imageDirectory + lightboxImage.file;
			lightboxContent += lightTag[2];
			lightboxContent += lightTag[3] + lightboxImage.description;
			lightboxContent += lightTag[4];
			document.getElementById('lightbox').removeAttribute('class', 'hidden');
			embedHTML.innerHTML = lightboxContent;
			checkArrows();
		}
	}
}

function hideSpotlight() {
	document.getElementById('lightbox').setAttribute('class', 'hidden');
}

function nextSib(event) {
	if (lightboxPosition < lightboxLength) {
		lightboxPosition += 1;
		document.getElementById('lightbox-image').setAttribute('src', imageDirectory + lightboxList[lightboxPosition].file);
		document.getElementById('lightbox-description').innerHTML = lightboxList[lightboxPosition].description;
	}
	checkArrows();
	stopProp(event);
}

function prevSib(event) {
	if (lightboxPosition > 0) {
		lightboxPosition -= 1;
		document.getElementById('lightbox-image').setAttribute('src', imageDirectory + lightboxList[lightboxPosition].file);
		document.getElementById('lightbox-description').innerHTML = lightboxList[lightboxPosition].description;
	} 
	checkArrows();
	stopProp(event);
}

function checkArrows() {
	if (lightboxPosition < lightboxLength)  {
		document.getElementById('right-arrow').setAttribute('class', 'enabled');
	} else {
		document.getElementById('right-arrow').setAttribute('class', 'disabled');
	}
	if (lightboxPosition > 0) {
		document.getElementById('left-arrow').setAttribute('class', 'enabled');
	} else {
		document.getElementById('left-arrow').setAttribute('class', 'disabled');
	}
}

function stopProp(event) {
	var e = event || window.event;
	if (e.stopPropogation) {
		e.stopPropogation;
	} else {
		e.cancelBubble = true;
	}
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