$(document).ready(function() {
  // temporary style placeholders
  $('body').css({'background': '-webkit-gradient(linear, 0% 100%, 100% 0%, color-stop(1%, #00D4E0),color-stop(50%, #f7086b),color-stop(100%, #43cea2))'});
  $('.title').css({'color': 'white'});

  $('.playlist-form').on('click', function() {
    this.submit();
  });
});
