$(function(){
  beoordelingenBubbleClick();
  setInterval(function(){verslagenTada()},4000);
  mobileNav();
});

function mobileNav() {

  $('.mobile-nav-toggle').on('click', function() {

    var status = $(this).hasClass('is-open');
    if(status){ $('.mobile-nav-toggle, .mobile-nav').removeClass('is-open'); }
    else { $('.mobile-nav-toggle, .mobile-nav').addClass('is-open');}

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
