// When the user clicks the browser-action button...
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.browserAction.setPopup({popup:'popup.html'})
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  console.log(request)
  if (request.message === 'info sent') {
    sendResponse({message: 'close window'})
  } else if (request.message === 'get data') {
    sendResponse({title: window.title,
                  description: window.description,
                  image: window.image,
                  url: window.url,
                  dateAdded: window.dateAdded
                })
  } else {
    if (!request.title) {
      window.title = ''
    } else {
      window.title = request.title
    }
    if (!request.description) {
      window.description = ''
    } else {
      window.description = request.description
    }
    if (!request.image) {
      window.image = ''
    } else {
      window.image = request.image
    }
    if (!request.url) {
      window.url = ''
    } else {
      window.url = request.url
    }
    if (!request.image) {
      window.dateAdded = ''
    } else {
      window.dateAdded = Date.now()
    }
  }
})
