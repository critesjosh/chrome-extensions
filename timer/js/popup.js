var intervalId = setInterval(getTime, 1000)

function getTime() {
  chrome.runtime.sendMessage({message: 'get time'}, function(response) {
    var seconds = response.time / 1000
    var minutes = Math.floor(seconds / 60)
    seconds = seconds % 60
    seconds = pad2(seconds)
    document.getElementById('time').innerHTML = `Time remaining: ${minutes}:${seconds}`
  })
}

document.getElementById('set').addEventListener('click', function(){
  var time = document.getElementById('setTimer')
  time = time.value * 1000 * 60
  chrome.storage.local.set({timerLength: time}, function() {
    console.log('timer set to ' + time + 'seconds')
    chrome.runtime.reload()
  })
})

function pad2(number) {
 return (number < 10 ? '0' : '') + number
}
