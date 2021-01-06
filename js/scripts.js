const setWindow = function(Id) {
	window.location.href="#"+Id;
}

const setLeftPos = function() {
    var sidebar = document.getElementById("sidebar");
    var divWidth = document.getElementById("left").offsetWidth;
	var sidebarWidth = document.getElementById("menu").offsetWidth;
	sidebar.style.left = (divWidth / 2 - sidebarWidth / 2).toString() + "px";
}

const setTopPos = function() {
	var currPos = window.pageYOffset;
    var sidebar = document.getElementById("sidebar");
    var finalPos = 0;
	finalPos = currPos > 240 ? (currPos + window.innerHeight / 2).toString() + "px" : "480px";
    sidebar.style.top = finalPos.toString();
}

const hidePhoto = function() {
	let titleImage = document.getElementById("titleImage");
	if (titleImage.style.display === "block") {
		titleImage.style.display = "none";
	} else {
		titleImage.style.display = "block";
	}
}

const resizeImage = function() {
	var mainWidth = document.getElementsByClassName("main")[0].offsetWidth;
	var image = document.getElementById("titleImage");

	image.setAttribute("width", mainWidth.toString());
	image.setAttribute("height", "450");

}


setLeftPos();
setTopPos();
resizeImage();

window.onscroll = function() {
	setTopPos();
}

window.onresize = function() {
	setLeftPos();
	resizeImage();
}



const showPictures = function() {
	var button = document.getElementsByClassName("button")[0];
	var zdjecia = document.getElementById("zdjecia");
	if (zdjecia.style.display === "inline-block") {
		zdjecia.style.display = "none";
		button.innerText = "Pokaż zdjęcia";
	} else {
		zdjecia.style.display = "inline-block";
		button.innerText = "Schowaj zdjęcia";
	}
}

