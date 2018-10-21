'use strict';

let initialSpeed = 1;
let initDegree = 0;
let mirrorStatus = 1;
let commentStatus = -1;
let recommendedStatus = -1;

function speedUp() {
  initialSpeed += .1;
  initialSpeed = Math.round(initialSpeed * 10) / 10;
  playSpeed.innerHTML = 'Speed: ' + initialSpeed + 'x';
  console.log(playSpeed);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {file: 'speedUp.js'}
    )
  });
}

function speedDown() {
  initialSpeed -= .1;
  initialSpeed = Math.round(initialSpeed * 10) / 10;
  playSpeed.innerHTML = 'Speed: ' + initialSpeed + 'x';
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {file: 'speedDown.js'}
    )
  });
}

function rotate() {
    var deg = this.value;
    slideRotation.innerHTML = "Rotation: " + deg + '°';
    var c = 'document.getElementsByClassName("html5-video-player")[0].style.transform = "rotate('+deg.toString()+'deg)"';
    console.log(c);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
        tabs[0].id,
        {code: c})

    });

}

function toggleMirror() {
      mirrorStatus*=-1

      if(mirrorStatus == 1){
        toggleMirrorText.innerHTML = "Mirror: Off";
      }
      else {
        toggleMirrorText.innerHTML = "Mirror: On";
      }
      var c = 'document.getElementsByClassName("html5-video-player")[0].style.transform = "scalex('+mirrorStatus.toString()+')"';
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
          {code: c})

      });
}

function toggleComments() {
    commentStatus*=-1
    var comments = document.getElementById('sections');
    if(commentStatus == 1){
      toggleCommentsText.innerHTML = "Comments: Off";
      var c = 'comments.style.visibility = "hidden"';
    }
    else {
      toggleCommentsText.innerHTML = "Comments: On";
      var c = 'comments.style.visibility = "visible"';
    }

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
        tabs[0].id,
        {code: c})
    });
}

function toggleRecommended() {
    recommendedStatus*=-1

    if(recommendedStatus == 1){
      toggleRecommendedText.innerHTML = "Recommended: Off";
      var r = 'document.querySelector("div#items.style-scope.ytd-watch-next-secondary-results-renderer").style.visibility = "hidden"';
    }
    else {
      toggleRecommendedText.innerHTML = "Recommended: On";
      var r = 'document.querySelector("div#items.style-scope.ytd-watch-next-secondary-results-renderer").style.visibility = "visible"';
    }
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
        tabs[0].id,
        {code: r})
    });
}

document.getElementById('up').addEventListener('click', speedUp);
document.getElementById('down').addEventListener('click', speedDown);
document.getElementById('myRange').addEventListener('input', rotate);
document.getElementById('toggleMirror').addEventListener('click', toggleMirror);
document.getElementById('toggleComments').addEventListener('click', toggleComments);
document.getElementById('toggleRecommended').addEventListener('click', toggleRecommended);
