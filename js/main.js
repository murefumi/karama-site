
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle?.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.dropdown-toggle').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const item = btn.closest('.has-dropdown');
    const isOpen = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
    document.querySelectorAll('.has-dropdown').forEach(other => {
      if (other !== item) {
        other.classList.remove('open');
        other.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded','false');
      }
    });
  });
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.has-dropdown')) {
    document.querySelectorAll('.has-dropdown').forEach(item => {
      item.classList.remove('open');
      item.querySelector('.dropdown-toggle')?.setAttribute('aria-expanded','false');
    });
  }
});

mainNav?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    if (window.innerWidth <= 840) {
      mainNav.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded','false');
    }
  });
});

window.addEventListener('load', () => {
  if (window.instgrm?.Embeds) window.instgrm.Embeds.process();
});
/* =========================
   CAROSELLO HOME
   ========================= */

const carousel = document.querySelector('.intro-carousel');

if (carousel) {

  const slides = carousel.querySelectorAll('.carousel-slide');
  const prevButton = carousel.querySelector('.carousel-prev');
  const nextButton = carousel.querySelector('.carousel-next');
  const dotsContainer = carousel.querySelector('.carousel-dots');

  let currentSlide = 0;
  let autoplay;


  /* CREA I PALLINI */

  slides.forEach((slide, index) => {

    const dot = document.createElement('button');

    dot.classList.add('carousel-dot');

    if (index === 0) {
      dot.classList.add('active');
    }

    dot.type = 'button';
    dot.setAttribute('aria-label', `Vai all'immagine ${index + 1}`);

    dot.addEventListener('click', () => {
      showSlide(index);
      restartAutoplay();
    });

    dotsContainer.appendChild(dot);

  });


  const dots = dotsContainer.querySelectorAll('.carousel-dot');


  /* MOSTRA SLIDE */

  function showSlide(index) {

    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = (index + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');

  }


  /* FRECCE */

  nextButton.addEventListener('click', () => {
    showSlide(currentSlide + 1);
    restartAutoplay();
  });


  prevButton.addEventListener('click', () => {
    showSlide(currentSlide - 1);
    restartAutoplay();
  });


  /* AUTOPLAY */

  function startAutoplay() {

    autoplay = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);

  }


  function restartAutoplay() {

    clearInterval(autoplay);
    startAutoplay();

  }


  /* FERMA QUANDO IL MOUSE È SOPRA */

  carousel.addEventListener('mouseenter', () => {
    clearInterval(autoplay);
  });


  carousel.addEventListener('mouseleave', () => {
    startAutoplay();
  });


  startAutoplay();

}