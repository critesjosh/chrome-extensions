//get the timer length from local browser storage
chrome.storage.local.get(function(storage){
  window.timer = storage.timerLength
  window.timeRemaining = window.timer
})

// When the user clicks the browser-action button...
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.browserAction.setPopup({popup:'popup.html'})
});
//call deduct every one second
var id2 = setInterval(deduct1sec, 1000)
//decduct one second
function deduct1sec () {
  window.timeRemaining = window.timeRemaining - 1000
  //if time runs out, open the new tab
  if(window.timeRemaining === 0) {
    chrome.tabs.create({url: 'http://localhost:8080'})
    //reset the timer
    window.timeRemaining = window.timer
  }
}
//send the remaining time to the popup for display
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  console.log(request)
  sendResponse({time: window.timeRemaining})
})
