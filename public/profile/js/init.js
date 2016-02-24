(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();


    $(window).scroll(function() {
      if ($(document).scrollTop() > 100) {
        $('#mainNav').removeClass('top-transparent');
        $('#mainNav').addClass('top-color');
      } else {
        $('#mainNav').removeClass('top-color');
        $('#mainNav').addClass('top-transparent');
      }
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space