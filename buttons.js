'use strict';


chrome.storage.sync.get(['playbackRate'], function(result) {
  let currentSpeed = result.playbackRate;
  playSpeed.innerHTML = 'Speed: ' + currentSpeed + 'x';
});

chrome.storage.sync.get(['mirror'], function(result) {
  let currentMirror = result.mirror;
  toggleMirrorText.innerHTML = 'Mirror: ' + currentMirror;
});

chrome.storage.sync.get(['mirrorCheck'], function(result) {
  let currentMirrorCheck = result.mirrorCheck;
  document.getElementById("toggleMirror").checked = currentMirrorCheck;
});

chrome.storage.sync.get(['sliderValue'], function(result) {
  let slideValue = result.sliderValue;
  myRange.value = slideValue;
  slideRotation.innerHTML = "Rotation: " + slideValue.toString() + '°';
});

chrome.storage.sync.get(['comments'], function(result) {
  let currentComments = result.comments;
  toggleCommentsText.innerHTML = 'Comments: ' + currentComments;
});

chrome.storage.sync.get(['commentsCheck'], function(result) {
  let currentCommentsCheck = result.commentsCheck;
  document.getElementById("toggleComments").checked = currentCommentsCheck;
});

chrome.storage.sync.get(['recommended'], function(result) {
  let currentRecommended = result.recommended;
  toggleRecommendedText.innerHTML = 'Recommended: ' + currentRecommended;
});

chrome.storage.sync.get(['recommendedCheck'], function(result) {
  let currentRecommendedCheck = result.recommendedCheck;
  document.getElementById("toggleRecommended").checked = currentRecommendedCheck;
});


function speedUp(newspeed) {
  newspeed += .1;
  newspeed = Math.round(newspeed * 10) / 10;
  // playSpeed.innerHTML = 'Speed: ' + initialSpeed + 'x';
  playSpeed.innerHTML = 'Speed: ' + newspeed + 'x';
  savePlaybackRate(newspeed);
  console.log(playSpeed);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {file: 'speedUp.js'}
    )
  });
}

function savePlaybackRate(savedPlaybackRate) {
  chrome.storage.sync.set({'playbackRate': savedPlaybackRate}, function() {
    // Notify that we saved.
    console.log('Settings updated');
    });
}

function getPlaybackRate() {
  chrome.storage.sync.get(['playbackRate'], function(result) {
  let newPlaybackRate = result.playbackRate;
  speedUp(newPlaybackRate);
  });
}

function getPlaybackRate2() {
  chrome.storage.sync.get(['playbackRate'], function(result) {
  let newPlaybackRate = result.playbackRate;
  speedDown(newPlaybackRate);
  });
}

function getToggleMirror() {
  chrome.storage.sync.get(['mirror'], function(result) {
  let getMirror = result.mirror;
  getToggleMirrorCheck(getMirror);
  });
}

function getToggleMirrorCheck(getMirror) {
  chrome.storage.sync.get(['mirrorCheck'], function(result) {
  let getMirrorCheck = result.mirrorCheck;
  toggleMirror(getMirror, getMirrorCheck);
  });
}


function speedDown(newspeed) {
  if (newspeed != 0) {
  newspeed -= .1;
  newspeed = Math.round(newspeed * 10) / 10;
  // playSpeed.innerHTML = 'Speed: ' + initialSpeed + 'x';
  playSpeed.innerHTML = 'Speed: ' + newspeed + 'x';
  savePlaybackRate(newspeed);
  console.log(playSpeed);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {file: 'speedDown.js'}
    )
  })
}
}



function saveSliderValue() {
  var deg = this.value;
  chrome.storage.sync.set({'sliderValue': deg}, function() {
    // Notify that we saved.
    console.log('Settings updated');
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

function saveToggleMirror(savedToggleMirror, savedToggleMirrorCheck) {
  chrome.storage.sync.set({'mirror': savedToggleMirror, 'mirrorCheck': savedToggleMirrorCheck}, function() {
    // Notify that we saved.
    console.log('Settings updated');
    });
}

function toggleMirror(mirrorStatus, mirrorCheckStatus) {
      if(mirrorStatus == "Off"){
      mirrorStatus = "On"
      mirrorCheckStatus = true
      toggleMirrorText.innerHTML = "Mirror: " + mirrorStatus;
      document.getElementById("toggleMirror").checked = mirrorCheckStatus;
      var c = 'document.getElementsByClassName("html5-video-player")[0].style.transform = "scaleX(-1)"';
      }
      else {
        mirrorStatus = "Off"
        mirrorCheckStatus = false
        toggleMirrorText.innerHTML = "Mirror: " + mirrorStatus;
        document.getElementById("toggleMirror").checked = mirrorCheckStatus;
        var c = 'document.getElementsByClassName("html5-video-player")[0].style.transform = "scaleX(1)"';
      }
      saveToggleMirror(mirrorStatus, mirrorCheckStatus)
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
          {code: c})
      });
}




function getToggleComments() {
  chrome.storage.sync.get(['comments'], function(result) {
  let getComments = result.comments;
  getToggleCommentsCheck(getComments);
  });
}

function getToggleCommentsCheck(getComments) {
  chrome.storage.sync.get(['commentsCheck'], function(result) {
  let getCommentsCheck = result.commentsCheck;
  toggleComments(getComments, getCommentsCheck);
  });
}

function saveToggleComments(savedToggleComments, savedToggleCommentsCheck) {
  chrome.storage.sync.set({'comments': savedToggleComments, 'commentsCheck': savedToggleCommentsCheck}, function() {
    // Notify that we saved.
    console.log('Settings updated');
    });
}

function toggleComments(commentStatus, commentCheckStatus) {
  if(commentStatus == "Off"){
  commentStatus = "On"
  commentCheckStatus = true
  toggleCommentsText.innerHTML = "Comments: " + commentStatus;
  document.getElementById("toggleComments").checked = commentCheckStatus;
  var c = 'document.getElementById("sections").style.visibility = "visible"';
  }
  else {
    commentStatus = "Off"
    commentCheckStatus = false
    toggleCommentsText.innerHTML = "Comments: " + commentStatus;
    document.getElementById("toggleComments").checked = commentCheckStatus;
    var c = 'document.getElementById("sections").style.visibility = "hidden"';
  }
  saveToggleComments(commentStatus, commentCheckStatus)
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {code: c})
  });
}


function getToggleRecommended() {
  chrome.storage.sync.get(['recommended'], function(result) {
  let getRecommended = result.recommended;
  getToggleRecommendedCheck(getRecommended);
  });
}

function getToggleRecommendedCheck(getRecommended) {
  chrome.storage.sync.get(['recommendedCheck'], function(result) {
  let getRecommendedCheck = result.recommendedCheck;
  toggleRecommended(getRecommended, getRecommendedCheck);
  });
}

function saveToggleRecommended(savedToggleRecommended, savedToggleRecommendedCheck) {
  chrome.storage.sync.set({'recommended': savedToggleRecommended, 'recommendedCheck': savedToggleRecommendedCheck}, function() {
    // Notify that we saved.
    console.log('Settings updated');
    });
}

function toggleRecommended(recommendedStatus, recommendedCheckStatus) {
  if(recommendedStatus == "Off"){
  recommendedStatus = "On"
  recommendedCheckStatus = true
  toggleRecommendedText.innerHTML = "Recommended: " + recommendedStatus;
  document.getElementById("toggleRecommended").checked = recommendedCheckStatus;
  var c = 'document.querySelector("div#items.style-scope.ytd-watch-next-secondary-results-renderer").style.visibility = "visible"';
  }
  else {
    recommendedStatus = "Off"
    recommendedCheckStatus = false
    toggleRecommendedText.innerHTML = "Recommended: " + recommendedStatus;
    document.getElementById("toggleRecommended").checked = recommendedCheckStatus;
    var c = 'document.querySelector("div#items.style-scope.ytd-watch-next-secondary-results-renderer").style.visibility = "hidden"';
  }
  saveToggleRecommended(recommendedStatus, recommendedCheckStatus)
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {code: c})
  });
}

document.getElementById('up').addEventListener('click', getPlaybackRate);
document.getElementById('down').addEventListener('click', getPlaybackRate2);
document.getElementById('myRange').addEventListener('input', rotate);
document.getElementById('myRange').addEventListener('change', saveSliderValue);
document.getElementById('toggleMirror').addEventListener('click', getToggleMirror);
document.getElementById('toggleComments').addEventListener('click', getToggleComments);
document.getElementById('toggleRecommended').addEventListener('click', getToggleRecommended);
