chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green');
  })
});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
chrome.storage.sync.set({
  playbackRate: 1,
  degree: 0,
  mirror: "Off",
  mirrorCheck: false,
  sliderValue: 0,
  comments: "On",
  commentsCheck: true,
  recommended: "On",
  recommendedCheck: true,
}, function() {
})
});

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

function savePlaybackRate(savedPlaybackRate) {
  chrome.storage.sync.set({'playbackRate': savedPlaybackRate}, function() {
    // Notify that we saved.
    console.log('Settings updated');
    });
}

function speedUp(newspeed) {
  newspeed += .1;
  newspeed = Math.round(newspeed * 10) / 10;
  // playSpeed.innerHTML = 'Speed: ' + initialSpeed + 'x';
  savePlaybackRate(newspeed);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {file: 'speedUp.js'}
    )
  });
}

function speedDown(newspeed) {
  if (newspeed != 0) {
  newspeed -= .1;
  newspeed = Math.round(newspeed * 10) / 10;
  // playSpeed.innerHTML = 'Speed: ' + initialSpeed + 'x';
  savePlaybackRate(newspeed);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {file: 'speedDown.js'}
    )
  })
}
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
      var c = 'document.getElementsByClassName("html5-video-player")[0].style.transform = "scaleX(-1)"';
      }
      else {
        mirrorStatus = "Off"
        mirrorCheckStatus = false
        var c = 'document.getElementsByClassName("html5-video-player")[0].style.transform = "scaleX(1)"';
      }
      saveToggleMirror(mirrorStatus, mirrorCheckStatus)
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
          {code: c})
      });
}

var deg = 0;

chrome.commands.onCommand.addListener(function(command) {
  console.log("Command", command);
  if (command === 'toggle-speedUp') {
    getPlaybackRate();
  }
  if (command === 'toggle-speedDown') {
    getPlaybackRate2();
  }
  if (command === 'toggle-rotate90') {
    deg -= 90
    var c = 'document.getElementsByClassName("html5-video-player")[0].style.transform = "rotate('+deg.toString()+'deg)"';
    console.log(c);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
        tabs[0].id,
        {code: c}
      )
    });
  }
  if (command === 'toggle-mirror') {
    getToggleMirror();
  }
});
