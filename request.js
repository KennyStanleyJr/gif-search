import { apiKey } from './apiKey.js'

let tag = ''
let button = false
let errorCounter = 0

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`)

window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
})

function displayGif(inputText) {
  if (inputText) {
    tag = inputText
  } else {
    tag = ''
  }

  let params = 'tag=' + tag

  if (button) {
    params = 'tag=' + document.getElementById('search-box')?.value
  }

  const apiKeyString = 'api_key=' + apiKey
  const url = 'https://api.giphy.com/v1/gifs/random' + '?' + apiKeyString
  const urlWithParams = url + '&' + params

  const request = new XMLHttpRequest()
  request.open('GET', urlWithParams, true)

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      const data = JSON.parse(request.responseText)?.data
      const url = data?.images?.original?.url
      document.getElementById('giphyme').innerHTML =
        '<img src = "' + url + '"  title="GIF via Giphy">'
    } else {
      console.log('reached giphy, but API returned an error')
    }
  }

  request.onerror = function () {
    console.log('connection error')
  }

  request.send()
}

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    displayGif()
  }
}

window.addEventListener(
  'error',
  function (e) {
    if (errorCounter < 3) {
      errorCounter++
      console.log(e)
      displayGif()
    } else {
      alert('Invalid search term. Please try again.')
      errorCounter = 0
      location.reload()
    }
  },
  true
)

window.checkEnter = function checkEnter(e) {
  if (e.keyCode === 13) {
    button = false
    const text = document.getElementById('search-box')?.value ?? ''
    displayGif(text)
  }
}

window.searchFromBtn = function searchFromBtn() {
  button = true
  const text = document.getElementById('search-box')?.value ?? ''
  displayGif(text)
}

window.shareGif = function shareGif() {
  const url = document.getElementById('giphyme').firstChild.src
  navigator.share({
    url: url,
  })
}