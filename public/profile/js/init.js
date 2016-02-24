(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();


    $(window).scroll(function() {
      if ($(document).scrollTop() > 100) {
        $('#mainNav').removeClass('top-transparent');
        $('#mainNav').addClass('top-color');
        $('#menu-button').removeClass('grey-text text-darken-1');
      } else {
        $('#mainNav').removeClass('top-color');
        $('#mainNav').addClass('top-transparent');
        $('#menu-button').addClass('grey-text text-darken-1');
      }
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space