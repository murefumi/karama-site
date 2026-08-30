
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
