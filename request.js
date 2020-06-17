const input = document.getElementById("search-box");
let q = '';
let button = false;

function displayGif(inputText) {
    if (inputText) {
        q = inputText;
    }

    let params = "tag=" + q;

    if (button) {
        params = "tag=" + document.getElementById("search-box").value;
    }
    console.log(params);
    
    const apiKey = "api_key=bdzQHUgRjaK9EEBmaTsTVv0S40x3QP9F";
    const url='https://api.giphy.com/v1/gifs/random';
	
	request = new XMLHttpRequest;
	request.open('GET', url+"?"+apiKey+"&"+params, true);
	
	request.onload = function() {
		if (request.status >= 200 && request.status < 400){
			data = JSON.parse(request.responseText).data.image_url;
			console.log(data);
			document.getElementById("giphyme").innerHTML = '<img src = "'+data+'"  title="GIF via Giphy">';
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