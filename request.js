const input = document.getElementById("search-box");
const header = document.getElementById("header");
let headerHeight = 0;
let contentHeight = 0;
let imageHeight = 0;
let imageWidth = 0;
let q = '';
let button = false;
let errorCounter = 0;

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

function containContent() {
    headerHeight = document.getElementById("header").offsetHeight;
    contentHeight = window.innerHeight - headerHeight - (5*vh);
    document.documentElement.style.setProperty('--ch', `${contentHeight}px`);
    // console.log("Content Height is: " + contentHeight);
    // if (condition) {
        
    // }
    if (document.querySelector('#giphyme img')) {
        let gif = document.querySelector('#giphyme img');

        imageHeight = gif.clientHeight;
        imageWidth = gif.clientWidth;
        // console.log("imageHeight + headerHeight > window.innerHeight: " + (imageHeight + headerHeight > window.innerHeight));
        if ((imageWidth > window.innerWidth * 0.95) && ((imageHeight + headerHeight) < window.innerHeight)) {
            console.log('portrait');
            document.querySelector('#giphyme img').style.width = "100%";
            document.querySelector('.content').style = "position: absolute;top: 50%;-ms-transform: translateY(-50%);transform: translateY(-50%);height: unset;width: 100%;text-align: center";
            document.querySelector('header h1').style = "font-size: 5vmin;";
            document.querySelector('.search-container').style = "width: unset;padding: 0 1rem;";
            document.querySelector('#giphyme').style.height = "unset";
        }
        else {
            console.log('landscape');
            document.querySelector('#giphyme img').style.width = "unset";
            document.querySelector('.content').style = "all: initial";
            document.querySelector('.content').style = "height: 100%;padding: 5vh 0;";
            document.querySelector('header h1').style = "font-size: unset";
            document.querySelector('.search-container').style = "width: 80%;padding: unset";
            document.querySelector('#giphyme').style.height = "var(--content-height)";
            
        }
    }
    
}

document.onreadystatechange = function() {
    containContent();
}; 

window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    containContent();
});

function displayGif(inputText) {
    if (inputText) {
        q = inputText;
    }

    let params = "tag=" + q;

    if (button) {
        params = "tag=" + document.getElementById("search-box").value;
    }
    
    const apiKey = "api_key=bdzQHUgRjaK9EEBmaTsTVv0S40x3QP9F";
    const url='https://api.giphy.com/v1/gifs/random'+"?"+apiKey;
	
	request = new XMLHttpRequest;
	request.open('GET', url+"&"+params, true);
	
	request.onload = function() {
		if (request.status >= 200 && request.status < 400){
			data = JSON.parse(request.responseText).data.image_url;
            console.log(request);
            document.getElementById("giphyme").innerHTML = '<img src = "'+data+'"  title="GIF via Giphy">';
		} else {
            console.log('reached giphy, but API returned an error');
		}
	};

	request.onerror = function() {
		console.log('connection error');
	};

    request.send();
    containContent();
}

document.addEventListener('DOMContentLoaded', displayGif);

window.addEventListener('error', function(e){
    if (errorCounter < 3) {
        errorCounter++;
        console.log(e);
        displayGif();
    } else {
        alert("Invalid search term. Please try again.");
        errorCounter = 0;
        location.reload();
    }
    
}, true);

function checkEnter(e){
    if (e.keyCode === 13){
        button = false;
        displayGif(document.getElementById("search-box").value);
    }

}

function searchFromBtn() {
    button = true;
    displayGif(document.getElementById("search-box").value);
}