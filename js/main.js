var breakWidth = 768;

$(document).ready(function() {

  var today = new Date();
  if (today.getDate() == 1 && today.getMonth() == 3) {
    $('body').addClass('foolsday');
  }

  $('#main')
    .transition('fade in', 1500);

  var $bodytag = $('html, body');
  var $tags = $('#goto-about, #goto-faq, #goto-reg-now, #goto-footer');
  $tags.click(function(e) {
    var elementName = e.target.id.substr(5);
    if ($(window).width() <= breakWidth) {
      $bodytag.animate({
        scrollTop: $('#'+elementName).offset().top
      }, 800);
    } else {
      $bodytag.animate({
        scrollTop: $('#'+elementName).offset().top - 45
      }, 800);
    }
  });

  hideAnswers();


  // Adapted from http://stackoverflow.com/questions/8425701/ajax-mailchimp-signup-form-integration
  // I only have one form on the page but you can be more specific if need be.
  var $form = $('form');

  if ( $form.length > 0 ) {
    $('form button[type="submit"]').bind('click', function ( event ) {
      if ( event ) event.preventDefault();
      register($form);
    });
  }

  function register($form) {
    $('#reg-email-label').slideUp();
    $.ajax({
      method: 'POST',
      url: $form.attr('action'),
      data: $form.serialize(),
      cache       : false,
      dataType    : 'json',
      contentType : "application/json; charset=utf-8",
      error       : function(err) { alert("Could not connect to the registration server. Please try again later."); },
      success     : function(data) {
        $('#reg-email-label').text(data.msg);
        if (data.result != "success") {
          // Something went wrong, do something to notify the user. maybe alert(data.msg);
          $('#reg-email-label').addClass('red basic').slideDown();
        } else {
          $('#reg-button').hide();
          $('#reg-email-label').removeClass('red basic').slideDown();
        }
      }
    });
  }

  //code for hiding answers
  $('.question').on('click', function() {
      if ($(window).width() <= breakWidth) {
        $question = $(this);
        $answer = $question.next();
        $answer.slideToggle(200);
        $question.children().toggleClass('angle-rotated');
      }
    })

  var resizeTimeout;
  var resizeNavbarTimeout;
  $(window).on('resize', function() {
    clearTimeout(resizeTimeout);
    clearTimeout(resizeNavbarTimeout);
    resizeTimeout = setTimeout(hideAnswers(), 200);
    resizeNavbarTimeout = setTimeout(recalculateNavbarPosition(), 250);
  });

  /* Following Nav Bar */
  var scrollTimeout;
  $(window).on('scroll', function() {
    if ($(window).width() >= 786) {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(checkAndMoveNavbarPosition(), 250);
    }
  });

  /* move the nav bar as appropriate */
  var isFixed = false;
  var navbarHeight;
  var deltaLocation;
  recalculateNavbarPosition();
  function checkAndMoveNavbarPosition() {
    if (!isFixed && $(window).scrollTop() > deltaLocation) {
      $('#navbar').stop(true).hide();
      $('#navbar').addClass('fixed');
      isFixed = true;
      $('#navbar').show();
    }
    else if (isFixed && $(window).scrollTop() < deltaLocation) {
      $('#navbar').stop(true).css("display", "none");
      $('#navbar').removeClass('fixed');
      isFixed = false;
      $('#navbar').show();
    }
  }

  function recalculateNavbarPosition() {
    navbarHeight = $('#navbar').outerHeight();
    deltaLocation = $('#splash').outerHeight() - navbarHeight;
  }
});


//run on window load and resize
function hideAnswers() {
  if ($(window).width() <= breakWidth) {
    $('.answer').css('display','none');
    $('.question').addClass('question-hidden');
    $('.angle').css('display', 'inline-block');
  }
  else {
    $('.answer').css('display','block');
    $('.question').removeClass('question-hidden');
    $('.angle').css('display', 'none');
    $('.angle').removeClass('angle-rotated');
  }
}

/* map configuration */
var map,center =  {
                    lat :53.1683441,
                    lng: 8.6510992
        },
  init = function(){
       map = new google.maps.Map(document.querySelector('.jacobshack-map'), {
           center: center,
           zoom : 16,
           scrollwheel: false,
       });
       var marker = new google.maps.Marker({
           position: center,
           map: map,
           title: 'jacobsHack!'
        });
   }