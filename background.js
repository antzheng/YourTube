chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green');
  })
});


let initialSpeed = 1;
let mirrorStatus = 1;
let deg = 0;

chrome.commands.onCommand.addListener(function(command) {
  console.log("Command", command);
  if (command === 'toggle-speedUp') {
    initialSpeed += .1;
    initialSpeed = Math.round(initialSpeed * 10) / 10;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
        tabs[0].id,
        {file: 'speedUp.js'}
      )
    });
  }
  if (command === 'toggle-speedDown') {
    initialSpeed -= .1;
    initialSpeed = Math.round(initialSpeed * 10) / 10;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
        tabs[0].id,
        {file: 'speedDown.js'}
      )
    });
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
    mirrorStatus*=-1;
    var c = 'document.getElementsByClassName("html5-video-player")[0].style.transform = "scalex('+mirrorStatus.toString()+')"';
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
        tabs[0].id,
        {code: c}
      )
    });
  }
});
