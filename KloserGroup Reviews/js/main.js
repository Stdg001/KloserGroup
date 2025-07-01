document.addEventListener('DOMContentLoaded', function() {
  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  const heroSection = document.querySelector('.hero-section');
  
  if (navbar && heroSection) {
    const heroHeight = heroSection.offsetHeight;
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > heroHeight * 0.8) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Client logos carousel
  const initClientCarousel = () => {
    const clientScroll = document.querySelector('.client-scroll');
    const clientLogos = document.querySelectorAll('.client-logo');
    
    if (!clientScroll || clientLogos.length === 0) return;
    
    // Clone logos for infinite effect
    const logosContainer = clientScroll;
    const firstLogo = logosContainer.firstElementChild;
    const lastLogo = logosContainer.lastElementChild;
    
    // Calculate total width needed
    let totalWidth = 0;
    clientLogos.forEach(logo => {
      totalWidth += logo.offsetWidth + 80; // 40px margin on each side
    });
    
    // Set container width
    logosContainer.style.width = `${totalWidth * 2}px`;
    
    // Clone logos
    const clonedLogos = logosContainer.innerHTML;
    logosContainer.innerHTML = clonedLogos + clonedLogos;
    
    // Animation
    let scrollPosition = 0;
    const speed = 1;
    
    function animate() {
      scrollPosition += speed;
      
      if (scrollPosition >= totalWidth) {
        scrollPosition = 0;
      }
      
      logosContainer.style.transform = `translateX(-${scrollPosition}px)`;
      requestAnimationFrame(animate);
    }
    
    animate();
  };
  
  initClientCarousel();

  // Form validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('nombre').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('mensaje').value.trim();
      
      if (!name || !email || !message) {
        alert('Por favor completa todos los campos requeridos');
        return;
      }
      
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))