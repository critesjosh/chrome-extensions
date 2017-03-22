
var title = document.title
var url = document.location.href
var description = ''
var image = ''

//set description
if ($('meta[name=description]').attr('content')) {
  description = $('meta[name=description]').attr('content')
} else if ($('meta[name=Description]').attr('content')) {
  description = $('meta[name=Description]').attr('content')
} else if ($('meta[name="twitter:description"]').attr('content')) {
  description = $('meta[name="twitter:description"]').attr('content')
}

//set image
if($('meta[property="og:image"]').attr('content') && $('meta[property="og:image"]').attr('content').indexOf('http') >= 0) {
  image = $('meta[property="og:image"]').attr('content')
}

//set date
var dateAdded = Date.now()

title = encodeURIComponent(title)
url = encodeURIComponent(url)
description = description

//send data to background window
chrome.runtime.sendMessage({title: title,
                            url: url,
                            image: image,
                            description: description,
                            dateAdded: dateAdded},
  function(response){
  console.log(response)
})
