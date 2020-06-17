const input = document.getElementById("search-box");
let q = '';
let button = false;
let errorCounter = 0;

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
			document.getElementById("giphyme").style.backgroundImage = "url("+data+")";
		} else {
            console.log('reached giphy, but API returned an error');
		}
	};

	request.onerror = function() {
		console.log('connection error');
	};

	request.send();
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