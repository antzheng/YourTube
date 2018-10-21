// alert('Content script loaded');
var currentRate = document.querySelector('video').playbackRate;
function speedUp() {

  currentRate+=0.1;
  currentRate = Math.round(currentRate * 10) / 10;
  document.querySelector('video').playbackRate = currentRate;

}
speedUp();

console.log(currentRate);
// chrome.runtime.sendMessage({text: "spedUp"}, function(response) {})
