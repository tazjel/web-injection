$(document).ready(function(){
  var editor = null;
  var defaultCode = 'window.lg = function(m,o){var style="font-size:1.2em;font-weight:bold;color:purple;";if(o){console.log("%c"+m+": ",style);console.dir(o)}else if(o===undefined)console.log("%c"+m,style);else console.log("%c"+m+": "+o,style)};';
  
  chrome.storage.sync.get({
    code: defaultCode
  }, function(items) {
    editor = CodeMirror.fromTextArea(txtCode, {
      mode: 'javascript',
      lineNumbers: true,
      autofocus: true
    });
    editor.setValue(items.code);
  });
  
  $('#btnSave').click(function(){
    chrome.storage.sync.set({
      code: editor.getValue()
    }, function() {
      $('#msgStatus').text("Content saved.");
      $('#msgStatus').fadeIn();
      setTimeout(function() {
        $('#msgStatus').fadeOut();
      }, 1250);
      
    });
  });
});