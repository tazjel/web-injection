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
    editor.on('change', function(){
      $('#save').removeClass('saved').addClass('dirty');
    });
  });
  
  function say(msg){
    $('#msg').text(msg);
    $('#msg').fadeIn();
    setTimeout(function() {
      $('#msg').fadeOut();
    }, 1850);
  }
  
  $('#save').click(function(){
    chrome.storage.sync.set({
      code: editor.getValue()
    }, function() {
      $('#save').removeClass('dirty').addClass('saved');
      say("Whew! That was a close one.");
    });
  });
  
  $('#beautify').click(function(){
    editor.setValue(js_beautify(editor.getValue(), {
      indent_size: 2,
      preserve_newlines: false
    }));
    say("Isn't it beautiful?");
  });
  
});