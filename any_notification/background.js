//get permission to send the user notifications
Notification.requestPermission().then(function(result){
  console.log(result);
});

//get the timer length from local browser storage
setTimeout(function(){
  chrome.storage.local.get(function(storage){
    if (!storage.timerLength) {
      var time = 23*60*1000;
      window.timer = time;
      chrome.storage.local.set({timerLength: time});
    }
    window.timer = storage.timerLength;
    window.timeRemaining = window.timer;
    console.log(storage);
  });
}, 1000);

// When the user clicks the browser-action button...
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.browserAction.setPopup({popup:'popup.html'});
});

//call deduct every one second
var id2 = setInterval(deduct1sec, 1000);

var notification;
//decduct one second
function deduct1sec () {
  window.timeRemaining = window.timeRemaining - 1000
  //if time runs out, open the new tab
  if(window.timeRemaining === 0) {
    var time = timer / (60 * 1000)
    chrome.notifications.create('note1', {type: "basic",
                                iconUrl: "icons/clock_icon128.png",
                                title: "Stop and Reflect",
                                message: `You've been working for ${time} minutes, click to reflect on your session.`,
                                isClickable: true})
    //reset the timer
    window.timeRemaining = window.timer
  }
}

//send the remaining time to the popup for display
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  sendResponse({time: window.timeRemaining})
})

chrome.notifications.onClicked.addListener(function(notification){
  chrome.tabs.create({url: 'https://timer-questions-page.herokuapp.com/questions',
                      active: true})
  chrome.notifications.clear('note1')
})
