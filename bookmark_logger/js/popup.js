
chrome.tabs.getSelected(function(tab){
  //inject jQuery into current tab
  chrome.tabs.executeScript(tab.id, {
      file: "js/jquery.js",
      allFrames: true,
      runAt: "document_idle"
  });
  //inject log.js into current tab
  chrome.tabs.executeScript(tab.id, {
      file: "js/log.js",
      runAt: "document_idle"
  }, function() { //after the injected code executs, run the follow code
    chrome.runtime.sendMessage({message: 'get data'},
      //message callback
      function(response){
        console.log(response)
        //add title to popup
        document.getElementById('title').value = decodeURIComponent(response.title)
        //add description to popup
        if (response.description) {
          document.getElementById('description').value = decodeURIComponent(response.description)
        }
        document.getElementById('image').value = decodeURIComponent(response.image)
        document.getElementById('url').value = decodeURIComponent(response.url)
        document.getElementById('dateAdded').value = decodeURIComponent(response.dateAdded)
        })
    })

})
