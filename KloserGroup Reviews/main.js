document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.getElementById('navbar');
  const heroSection = document.querySelector('.hero-content');

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

  // Animación suave del carrusel con JavaScript
      const clientScroll = document.querySelector('.client-scroll');
      const clientLogos = document.querySelectorAll('.client-logo');
      if (clientLogos.length === 0) return;
      
      // Calcula el ancho total de un logo con márgenes
      const style = window.getComputedStyle(clientLogos[0]);
      const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      const logo1Width = clientLogos[0].offsetWidth + margin;
      const logo2Width = clientLogos[1].offsetWidth + margin;
      const logo3Width = clientLogos[2].offsetWidth + margin;
      const logoWidth = logo1Width + logo2Width +logo3Width;

      // El punto de reinicio es cuando se ha desplazado la mitad de los logos (3 logos)
      const resetPoint = logoWidth;
      
      let scrollPosition = 0;
      const speed = 0.5; // Velocidad del desplazamiento
      
      function animateScroll() {
        scrollPosition += speed;
        
        // Reinicia la posición cuando llega al punto de reinicio
        if (scrollPosition >= resetPoint) {
          scrollPosition = 0;
        }
        
        clientScroll.style.transform = `translateX(-${scrollPosition}px)`;
        requestAnimationFrame(animateScroll);
      }
      
      animateScroll();

});