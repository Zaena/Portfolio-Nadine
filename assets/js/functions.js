$(function(){
  beoordelingenBubbleClick();
  setInterval(function(){verslagenTada()},4000);
  mobileNav();
  lesplannenBGStuff();
  smoothScroll(300);
});

function mobileNav() {

  $('.mobile-nav-toggle').on('click', function() {

    var status = $(this).hasClass('is-open');
    if(status){ $('.mobile-nav-toggle, .mobile-nav').removeClass('is-open'); }
    else { $('.mobile-nav-toggle, .mobile-nav').addClass('is-open');}

  });

}

function smoothScroll(duration) {

  $('a[href^="#"]').on('click', function(event) {

    var target = $( $(this).attr('href') );

    if( target.length ) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: target.offset().top
        }, duration);
    }

  });

}

function lesplannenBGStuff() {

  $('.lesplan-thumb').hover(function(){

    $(this).parent().parent().parent().parent().css('background-color', $(this).data('color'));
    $('.home-cta-lesplannen').css('color', $(this).data('color'));
    $('.lesplan-meta').css('background-color', $(this).data('color'));

  }, function(){

    $(this).parent().parent().parent().parent().css('background-color', $(this).parent().parent().parent().parent().data('orig-color'));
    $('.home-cta-lesplannen').css('color', $(this).parent().parent().parent().parent().data('orig-color'));

  });

}

function verslagenTada() {
  var randNum = Math.floor(Math.random() * $('.article-thumb').length) +1

  $('.article-thumb').eq(randNum).addClass('is-emph')
    .siblings().removeClass('is-emph');
}

function beoordelingenBubbleClick() {
  $('.face').on('click',function() {
    var $this = $(this),
        faceTop = $this.position().top,
        vertMath = -1 * (faceTop - 230),
        faceLeft = $this.position().left,
        horzMath = 0 - faceLeft;

    if($(window).width() > 640){
      $this.parent().css('top', + vertMath + 'px');
    } else {
      if($this.hasClass('back-btn')) {
        beoordelingenNarrowStart();
      } else {
        $this.parent().css('left', + horzMath + 'px');
      }
    }
    if(!$this.hasClass('back-btn')) {
      $this.addClass('has-bubble-open')
        .siblings().removeClass('has-bubble-open');
    }
  });


  // when I click a face
  // get the distance of the face from its  parent
  // move the whole container up 115px + the count
  // add the is-open class to the face, pop the balloon

}

$(window).scroll(function(){
  videosVidScroll();
  startBeoordelingen();
  startVerslagen();
  startLesplannen();
});

function videosVidScroll() {
  var wScroll = $(window).scrollTop();

  $('.video-strip').css('background-position','center -'+ wScroll +'px');
  
}

function startVerslagen() {
  var wScroll = $(window).scrollTop();

  if($('section.verslagen').offset().top - $(window).height()/2 < wScroll) {
    $('.article-thumb').each(function(i){
      setTimeout(function(){
        $('.article-thumb').eq(i).addClass('is-visible');
      }, 100 * i);
    });
  }
}

function startLesplannen() {
  var wScroll = $(window).scrollTop();

  if($('section.lesplannen').offset().top - $(window).height()/2 < wScroll) {
    $('.lesplan-thumb').each(function(i){
      setTimeout(function(){
        $('.lesplan-thumb').eq(i).addClass('is-visible');
      }, 100 * i);
    });
  }
}

function startBeoordelingen() {

  var wScroll = $(window).scrollTop();

  if($('section.beoordelingen').offset().top - $(window).height()/2 < wScroll) {
    if($(window).width() > 640) {
    $('.faces').addClass('launched');
      if(!$('.face').hasClass('has-bubble-open')){
        setTimeout(function(){

          $('.face:nth-child(3)').addClass('has-bubble-open');

        }, 400);
      }
    } else {
      beoordelingenNarrowStart();
    }
  }

}

function beoordelingenNarrowStart() {
  $('.faces').css({
    'top': '230px',
    'left': '0px'
  });
  $('.face').first().addClass('has-bubble-open')
    .siblings().removeClass('has-bubble-open');
}

function beoordelingenWideStart() {
  $('.faces').css({
    'top': '0px',
    'left': '0px'
  });
  $('.face:nth-child(3)').addClass('has-bubble-open')
    .siblings().removeClass('has-bubble-open');
}

$(window).resize(function() {
  if($(window).width() > 640) {
    beoordelingenWideStart();
  } else {
    beoordelingenNarrowStart();
  }
});
