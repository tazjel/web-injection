$(document).ready(function(){
  var defaultCode = 'window.lg = function(m,o){var style="font-size:1.2em;font-weight:bold;color:purple;";if(o){console.log("%c"+m+": ",style);console.dir(o)}else if(o===undefined)console.log("%c"+m,style);else console.log("%c"+m+": "+o,style)};';
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.name == 'code'){
      chrome.storage.sync.get({
        code: defaultCode
      }, function(items){
        sendResponse({code: items.code});
      });
    }
    return true;
  });
});