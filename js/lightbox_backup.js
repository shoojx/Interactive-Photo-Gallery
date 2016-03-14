var imageTag = [
	'<div class="img"><img src="',
	'" alt="',
	'" onclick="',
	'"></div>'
];
var clickFunction = 'renderSpotlight()';
var imageDirectory = './img/';
var thumbDirectory = './img/Thumbnails/';
var ajaxRequest = new XMLHttpRequest();
var jsonData = './db/images.json';
var imageList = getImages

function getImages(search) {
	ajaxRequest.onreadystatechange = function(){
		if (ajaxRequest.readyState == 4 && ajaxRequest.status == 200) {
			var imageList = JSON.parse(ajaxRequest.responseText);
			renderThumbs(imageList);
		}
	}
	ajaxRequest.open("GET", jsonData, true);
	ajaxRequest.send();
}

function renderThumbs(thumbs) {
	var listImages = '';
	for (var x = 0; x < 3; x += 1) { //Purposely adding multiple dupes
		for (var i = 0; i < thumbs.length; i += 1) {
			listImages += imageTag[0];
			listImages += thumbDirectory + thumbs[i].file;
			listImages += imageTag[1];
			listImages += thumbs[i].title;
			listImages += imageTag[2];
			listImages += clickFunction;
			listImages += imageTag[3];
		}
	}
	var embedHTML = document.getElementById('gallery-thumbnails');
	embedHTML.innerHTML += listImages;
}

function renderSpotlight() { 
	console.log('stubbed function - you need to add lightbox functionality');
	//Add lightbox
	//change css of hidden lightbox to display: whatever
	//<img src=""
}

document.getElementById("gallery-search").addEventListener("input", function(){
	console.log('stubbed');
	for (var i = 0; i < imageList.length; i+= 1) {
		//if
		console.log('stubby');
	}
});