//NAVBAR
let lastScrollTop = 0;
navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageTOffset ||
    this.document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
         navbar.style.top="-50px";
    } else {
        navbar.style.top="0";
    }
    lastScrollTop = scrollTop;
});








//TYPED


var typed = new Typed('.typed', {
    strings: ['Developpeur Web', 'Web Developer'],
    typeSpeed: 50,
    backSpeed: 20,
    smartBackspace: true,
  });








//ORDIDYNA


  var ordi = document.querySelectorAll('.ordidyna');
  var mess = document.querySelectorAll('.message');

    document.getElementById('On').onclick = function () {
        for (var i = 0; i < ordi.length; i++) {
            if (ordi[i].style.animationPlayState == 'paused') {
                ordi[i].style.animationPlayState = 'running';
            }
            else {
                ordi[i].style.animationPlayState = 'running';
                mess[i].style.display = 'block';
            }
        }
}







  // COMPTEUR 



  let compteur = 0;

  $(window).scroll(function() {

    const top = $('.counter').offset().top - window.innerHeight;

    if (compteur == 0 && $(window).scrollTop() > top) {
      $('.counter-value').each(function() {
          let $this = $(this),
          countTo = $this.attr('data-count');
          $({
              countNum: $this.text()
          }).animate({
              countNum : countTo
          },
          {
              duration: 10000,
              easing: 'swing',
              step: function() {
                  $this.text(Math.floor(this.countNum));
              },
              complete: function() {
                  $this.text(this.countNum);
              }
          });
      });
      compteur = 1;
    }
});

//AOS

AOS.init();

AOS.init({
    disable: function() {
      var maxWidth = 1500;
      return window.innerWidth < maxWidth;
    }
  });