document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.getElementById('navbar');
  const heroSection = document.querySelector('.hero');

  if (!navbar || !heroSection) {
    console.error('No se encontró el navbar o la sección hero');
    return;
  }

  try {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navbar.classList.remove('scrolled');
        } else {
          navbar.classList.add('scrolled');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50% 0px' // Ajusta según necesites
    });

    observer.observe(heroSection);
  } catch (error) {
    console.error('Error al inicializar IntersectionObserver:', error);
  }
});