document.addEventListener('DOMContentLoaded', function() {
  // ======================
  // NAVBAR SCROLL EFFECT
  // ======================
  const navbar = document.getElementById('navbar');
  const heroSection = document.querySelector('.hero-section');
  
  if (navbar && heroSection) {
    const heroHeight = heroSection.offsetHeight;
    
    function updateNavbar() {
      if (window.scrollY > heroHeight * 0.8) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    
    // Initial check
    updateNavbar();
    
    // Update on scroll
    window.addEventListener('scroll', updateNavbar);
  }

  // ======================
  // SMOOTH SCROLLING
  // ======================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          location.hash = targetId;
        }
      }
    });
  });

  // ======================
  // CLIENTS CAROUSEL
  // ======================
  function initClientCarousel() {
    const clientScroll = document.querySelector('.client-scroll');
    const clientLogos = document.querySelectorAll('.client-logo');
    
    if (!clientScroll || clientLogos.length === 0) return;
    
    // Calculate total width
    let totalWidth = 0;
    const logosArray = Array.from(clientLogos);
    
    logosArray.forEach(logo => {
      const style = window.getComputedStyle(logo);
      const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      totalWidth += logo.offsetWidth + margin;
    });
    
    // Double the content for seamless looping
    clientScroll.innerHTML += clientScroll.innerHTML;
    
    // Animation variables
    let scrollPosition = 0;
    const speed = 0.8;
    let animationId;
    
    function animate() {
      scrollPosition += speed;
      
      // Reset position when half way
      if (scrollPosition >= totalWidth) {
        scrollPosition = 0;
      }
      
      clientScroll.style.transform = `translateX(-${scrollPosition}px)`;
      animationId = requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Pause on hover
    clientScroll.addEventListener('mouseenter', () => {
      cancelAnimationFrame(animationId);
    });
    
    clientScroll.addEventListener('mouseleave', () => {
      animate();
    });
  }
  
  initClientCarousel();

  // ======================
  // FORM VALIDATION
  // ======================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('nombre').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('asunto').value.trim();
      const message = document.getElementById('mensaje').value.trim();
      
      // Simple validation
      if (!name) {
        alert('Por favor ingresa tu nombre');
        return;
      }
      
      if (!email) {
        alert('Por favor ingresa tu email');
        return;
      }
      
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Por favor ingresa un email válido');
        return;
      }
      
      if (!message) {
        alert('Por favor ingresa tu mensaje');
        return;
      }
      
      // Form data to send (in a real app, you would send this to a server)
      const formData = {
        name,
        email,
        subject: subject || 'Consulta desde el sitio web',
        message
      };
      
      console.log('Formulario enviado:', formData);
      
      // Show success message
      alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
      
      // Reset form
      contactForm.reset();
    });
  }

  // ======================
  // PRICING CARD HOVER EFFECTS
  // ======================
  const pricingCards = document.querySelectorAll('.pricing-card');
  pricingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) { // Only on desktop
        pricingCards.forEach(c => {
          if (c !== card) {
            c.style.transform = 'scale(0.95)';
          }
        });
      }
    });
    
    card.addEventListener('mouseleave', () => {
      if (window.innerWidth > 768) {
        pricingCards.forEach(c => {
          c.style.transform = '';
        });
      }
    });
  });

  // ======================
  // RESPONSIVE ADJUSTMENTS
  // ======================
  function handleResponsiveChanges() {
    // Adjust carousel speed based on screen size
    const speed = window.innerWidth < 768 ? 0.5 : 0.8;
    
    // You could add more responsive adjustments here
  }
  
  // Initial call
  handleResponsiveChanges();
  
  // Update on resize
  window.addEventListener('resize', handleResponsiveChanges);
});