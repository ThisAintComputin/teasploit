// Create particles
function createParticles() {
  const particlesContainer = document.querySelector('.floating-particles');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');

    // Randomize particle properties
    const size = Math.random() * 5 + 2;
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    const opacity = Math.random() * 0.5 + 0.1;

    // Apply styles with updated colors
    particle.style.cssText = `
      position: absolute;
      top: ${posY}px;
      left: ${posX}px;
      width: ${size}px;
      height: ${size}px;
      background: ${Math.random() > 0.6 ? '#7245D9' : Math.random() > 0.3 ? '#4b1c99' : '#080810'};
      border-radius: 50%;
      opacity: ${opacity};
      pointer-events: none;
      box-shadow: 0 0 ${size * 2}px rgba(89, 30, 177, 0.8);
      animation: float ${duration}s ease-in-out ${delay}s infinite;
    `;

    particlesContainer.appendChild(particle);
  }
}

// Add parallax effect on mouse move
function addParallaxEffect() {
  const card = document.querySelector('.glass-card');
  const title = document.querySelector('.title');

  document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;

    card.style.transform = `translateY(-15px) perspective(1000px) rotateX(${y * 5}deg) rotateY(${-x * 5}deg)`;
    title.style.textShadow = `
      ${x * 5}px ${y * 5}px 15px rgba(201, 160, 255, 0.8),
      ${-x * 10}px ${-y * 10}px 30px rgba(201, 160, 255, 0.4)
    `;
  });

  document.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(-15px) rotateX(0) rotateY(0)';
    title.style.textShadow = '0 0 15px rgba(201, 160, 255, 0.8), 0 0 30px rgba(201, 160, 255, 0.4)';
  });
}

// Enhanced animated button effects
function buttonEffect() {
  const button = document.querySelector('.enhanced-button');
  
  // Check if button exists before adding event listeners
  if (button) {
    // Create particle container for the button
    const particlesContainer = button.querySelector('.button-particles');
    
    // Add hover animation effects
    button.addEventListener('mouseenter', () => {
      // Speed up nearby icons
      document.querySelectorAll('i').forEach(icon => {
        icon.style.animationDuration = '0.6s';
      });
      
      // Create particles on hover
      createButtonParticles(particlesContainer);
    });

    button.addEventListener('mouseleave', () => {
      // Return icons to normal speed
      document.querySelectorAll('i').forEach(icon => {
        icon.style.animationDuration = '2s';
      });
    });

    // Add click effects
    button.addEventListener('click', () => {
      // Add burst effect
      button.classList.add('clicked');
      
      // Create explosive particle effect
      createButtonClickBurst(button);
      
      // Ripple effect through nearby elements
      createRippleEffect(button);
      
      // Remove clicked class after animation completes and redirect
      setTimeout(() => {
        button.classList.remove('clicked');
        // Redirect to the specified URL
        window.location.href = 'https://spoo.me/getsurpware';
      }, 500);
    });
    
    // Add 3D tilt effect on mouse move
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left; 
      const y = e.clientY - rect.top;
      
      // Calculate rotation based on mouse position
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      // Apply 3D rotation
      button.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px) scale(1.03)`;
      
      // Move glow based on mouse position
      const glow = button.querySelector('.button-glow');
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)`;
      }
    });
    
    // Reset transform on mouse leave
    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
    });
  }
}

// Create particles for button hover effect
function createButtonParticles(container) {
  if (!container) return;
  
  // Clear existing particles
  container.innerHTML = '';
  
  // Create new particles
  for (let i = 0; i < 12; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 6 + 2;
    const color = Math.random() > 0.5 ? '#ff9edb' : '#a239ea';
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 1.5 + 0.5;
    const distance = Math.random() * 60 + 20;
    const delay = Math.random() * 0.5;
    
    particle.className = 'button-particle';
    particle.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      opacity: 0;
      z-index: 1;
      box-shadow: 0 0 ${size * 2}px ${color};
      transform: translate(-50%, -50%);
      animation: particleFloat ${speed}s ease-out ${delay}s infinite;
    `;
    
    // Set final position via custom property
    particle.style.setProperty('--endX', `${Math.cos(angle) * distance}px`);
    particle.style.setProperty('--endY', `${Math.sin(angle) * distance}px`);
    
    container.appendChild(particle);
  }
  
  // Add keyframe for particle animation if not already present
  if (!document.querySelector('#particleAnimation')) {
    const style = document.createElement('style');
    style.id = 'particleAnimation';
    style.textContent = `
      @keyframes particleFloat {
        0% { 
          opacity: 0;
          transform: translate(-50%, -50%) scale(0);
        }
        10% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        100% { 
          opacity: 0;
          transform: translate(calc(-50% + var(--endX)), calc(-50% + var(--endY))) scale(0);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Create burst effect when button is clicked
function createButtonClickBurst(button) {
  const rect = button.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  // Create burst container if not exists
  let burstContainer = document.querySelector('.button-burst-container');
  if (!burstContainer) {
    burstContainer = document.createElement('div');
    burstContainer.className = 'button-burst-container';
    burstContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(burstContainer);
  }
  
  // Create shockwave effect
  const shockwave = document.createElement('div');
  shockwave.style.cssText = `
    position: fixed;
    top: ${centerY}px;
    left: ${centerX}px;
    width: 10px;
    height: 10px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 20px rgba(162, 57, 234, 0.8);
    animation: shockwave 0.8s cubic-bezier(0.1, 0.8, 0.2, 1) forwards;
  `;
  burstContainer.appendChild(shockwave);
  
  // Create particles
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 8 + 4;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 1.5 + 1;
    const distance = Math.random() * 150 + 50;
    const hue = 270 + Math.random() * 60; // Purple to pink
    
    particle.style.cssText = `
      position: fixed;
      top: ${centerY}px;
      left: ${centerX}px;
      width: ${size}px;
      height: ${size}px;
      background: hsla(${hue}, 100%, 70%, 0.8);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 ${size * 2}px hsla(${hue}, 100%, 60%, 0.6);
      animation: burstParticle ${speed}s cubic-bezier(0.1, 0.8, 0.2, 1) forwards;
    `;
    
    // Set final position via custom property
    particle.style.setProperty('--endX', `${Math.cos(angle) * distance}px`);
    particle.style.setProperty('--endY', `${Math.sin(angle) * distance}px`);
    
    burstContainer.appendChild(particle);
  }
  
  // Add keyframes for burst animations if not already present
  if (!document.querySelector('#burstAnimations')) {
    const style = document.createElement('style');
    style.id = 'burstAnimations';
    style.textContent = `
      @keyframes shockwave {
        0% { 
          width: 10px; 
          height: 10px; 
          opacity: 1; 
          box-shadow: 0 0 20px rgba(162, 57, 234, 0.8);
        }
        100% { 
          width: 300px; 
          height: 300px; 
          opacity: 0; 
          box-shadow: 0 0 40px rgba(162, 57, 234, 0);
        }
      }
      
      @keyframes burstParticle {
        0% { 
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        100% { 
          opacity: 0;
          transform: translate(calc(-50% + var(--endX)), calc(-50% + var(--endY))) scale(0);
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Clean up elements after animation
  setTimeout(() => {
    while (burstContainer.firstChild) {
      burstContainer.removeChild(burstContainer.firstChild);
    }
  }, 2000);
}

// Create ripple effect that affects nearby elements
function createRippleEffect(button) {
  const icons = document.querySelectorAll('i');
  
  // Animate icons with staggered delay
  icons.forEach((icon, index) => {
    const delay = index * 0.03;
    icon.style.animation = `iconPulse 0.5s ease ${delay}s`;
    
    // Remove animation after it completes
    setTimeout(() => {
      icon.style.animation = '';
    }, 500 + delay * 1000);
  });
  
  // Add keyframes for icon pulse if not already present
  if (!document.querySelector('#iconPulseAnimation')) {
    const style = document.createElement('style');
    style.id = 'iconPulseAnimation';
    style.textContent = `
      @keyframes iconPulse {
        0% { transform: scale(1); color: #bb86fc; }
        50% { transform: scale(1.5); color: #ff9edb; }
        100% { transform: scale(1); color: #bb86fc; }
      }
    `;
    document.head.appendChild(style);
  }
}

// Enhanced background gradient animation
function animateBackground() {
  const bg = document.querySelector('.background-gradient');
  let hue = 260; // Start with purple hue

  // Create dynamic background elements
  createDynamicBackgroundEffects();

  setInterval(() => {
    hue = (hue + 0.5) % 360;
    bg.style.filter = `hue-rotate(${hue - 260}deg)`;
  }, 100);

  // Add pulsing effect to background
  setInterval(() => {
    bg.style.opacity = (parseFloat(bg.style.opacity || '0.85') > 0.8) ? '0.75' : '0.85';
    bg.style.backgroundSize = (bg.style.backgroundSize === '300% 300%') ? '320% 320%' : '300% 300%';
  }, 2000);
}

// Create dynamic background effects
function createDynamicBackgroundEffects() {
  const container = document.createElement('div');
  container.className = 'dynamic-bg-effects';
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
    overflow: hidden;
  `;
  document.body.appendChild(container);

  // Create floating orbs
  for (let i = 0; i < 15; i++) {
    const orb = document.createElement('div');
    const size = Math.random() * 300 + 100;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const hue = Math.random() * 60 + 260; // Purple to pink range
    const duration = Math.random() * 30 + 20;
    const delay = Math.random() * -30;

    orb.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      top: ${posY}%;
      left: ${posX}%;
      background: radial-gradient(circle, 
        hsla(${hue}, 100%, 75%, 0.05) 0%,
        hsla(${hue}, 100%, 70%, 0.03) 30%,
        hsla(${hue}, 100%, 60%, 0.01) 70%,
        hsla(${hue}, 100%, 50%, 0) 100%
      );
      filter: blur(${size/10}px);
      transform: translate(-50%, -50%) scale(0.8);
      animation: floatOrb ${duration}s ease-in-out ${delay}s infinite alternate;
      opacity: ${Math.random() * 0.3 + 0.1};
    `;

    container.appendChild(orb);
  }

  // Add shooting stars effect
  setInterval(createShootingStar, 3000);

  // Add keyframe animation for orbs
  const orbStyle = document.createElement('style');
  orbStyle.textContent = `
    @keyframes floatOrb {
      0% { transform: translate(-50%, -50%) scale(0.8) rotate(0deg); opacity: 0.1; }
      50% { transform: translate(-50%, -50%) scale(1.2) rotate(180deg); opacity: 0.25; }
      100% { transform: translate(-50%, -50%) scale(0.9) rotate(360deg); opacity: 0.15; }
    }

    @keyframes shootingStar {
      0% { transform: translateX(0) translateY(0) rotate(215deg) scale(0); opacity: 0; }
      10% { transform: translateX(-10vw) translateY(10vh) rotate(215deg) scale(1); opacity: 1; }
      100% { transform: translateX(-100vw) translateY(100vh) rotate(215deg) scale(0.1); opacity: 0; }
    }
  `;
  document.head.appendChild(orbStyle);

  function createShootingStar() {
    const star = document.createElement('div');
    const posX = Math.random() * 100 + 50;
    const posY = Math.random() * 20 - 20;
    const size = Math.random() * 300 + 100;
    const duration = Math.random() * 2 + 1;

    star.style.cssText = `
      position: absolute;
      top: ${posY}vh;
      left: ${posX}vw;
      width: ${size}px;
      height: 2px;
      background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(162,57,234,0.4) 100%);
      border-radius: 50%;
      z-index: -1;
      transform-origin: right center;
      animation: shootingStar ${duration}s ease-out forwards;
    `;

    container.appendChild(star);

    // Remove after animation
    setTimeout(() => {
      if (star.parentNode === container) {
        container.removeChild(star);
      }
    }, duration * 1000);
  }
}

// Animate title letters with superior 3D effects and no blur
function animateTitle() {
  const title = document.querySelector('.title');
  const text = title.textContent;
  title.textContent = '';
  title.setAttribute('aria-label', text);

  // Apply high-performance rendering
  title.style.cssText = `
    filter: none;
    text-rendering: geometricPrecision;
    -webkit-font-smoothing: subpixel-antialiased;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
  `;

  // Create spans for each letter with enhanced animation
  for (let i = 0; i < text.length; i++) {
    const letterSpan = document.createElement('span');
    letterSpan.textContent = text[i];
    letterSpan.style.cssText = `
      display: inline-block;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      transform: translateZ(0);
      will-change: transform, text-shadow;
      filter: none;
      text-rendering: geometricPrecision;
      -webkit-font-smoothing: subpixel-antialiased;
      position: relative;
      margin: 0 2px;
    `;

    // Different animation delay for each letter
    const delay = i * 0.08;
    letterSpan.style.animation = `
      letterFloat 3s ease-in-out ${delay}s infinite alternate,
      letterColor 8s ease-in-out ${delay + 0.5}s infinite alternate
    `;

    // Create electric glow effect
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      filter: blur(5px);
      opacity: 0.7;
      mix-blend-mode: screen;
      animation: glowPulse 2s ease-in-out ${delay}s infinite alternate;
    `;
    letterSpan.appendChild(glow);

    // Enhanced interactive hover effect
    letterSpan.addEventListener('mouseover', () => {
      letterSpan.style.color = getRandomColor();
      letterSpan.style.transform = 'translateY(-20px) scale(1.5) rotate(' + (Math.random() * 20 - 10) + 'deg)';
      letterSpan.style.filter = 'none';
      letterSpan.style.zIndex = '10';
      createCharacterBurst(letterSpan);
    });

    letterSpan.addEventListener('mouseout', () => {
      letterSpan.style.color = '';
      letterSpan.style.transform = 'translateZ(0)';
      letterSpan.style.zIndex = '1';
    });

    title.appendChild(letterSpan);
  }

  // Add enhanced letter animations with improved performance
  const letterAnimation = document.createElement('style');
  letterAnimation.textContent = `
    @keyframes letterFloat {
      0% { transform: translateY(0) rotateZ(0deg); }
      25% { transform: translateY(-8px) rotateZ(2deg); }
      50% { transform: translateY(-12px) rotateZ(-1deg); }
      75% { transform: translateY(-6px) rotateZ(1deg); }
      100% { transform: translateY(-15px) rotateZ(-2deg); }
    }

    @keyframes letterColor {
      0% { color: #c9a0ff; }
      33% { color: #ff9edb; }
      66% { color: #a239ea; }
      100% { color: #6b2cbf; }
    }

    @keyframes glowPulse {
      0% { background: rgba(189, 147, 249, 0.3); filter: blur(4px); }
      50% { background: rgba(255, 158, 219, 0.5); filter: blur(6px); }
      100% { background: rgba(162, 57, 234, 0.3); filter: blur(4px); }
    }
  `;
  document.head.appendChild(letterAnimation);

  // Add 3D glowing text effect
  title.addEventListener('mousemove', (e) => {
    const rect = title.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate distance from center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const distanceX = (x - centerX) / centerX;
    const distanceY = (y - centerY) / centerY;

    // Apply 3D rotation based on mouse position
    title.style.transform = `perspective(1000px) rotateX(${distanceY * 10}deg) rotateY(${distanceX * -10}deg)`;

    // Update shadow based on mouse position
    const shadow = `
      ${distanceX * 10}px ${distanceY * 10}px 10px rgba(162, 57, 234, 0.5),
      ${distanceX * -15}px ${distanceY * -15}px 15px rgba(255, 158, 219, 0.4)
    `;
    title.style.textShadow = shadow;
  });

  title.addEventListener('mouseleave', () => {
    title.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    title.style.textShadow = '0 0 10px rgba(162, 57, 234, 0.5)';
  });

  // Add magnetic effect to title
  title.addEventListener('mousemove', (e) => {
    const letters = title.querySelectorAll('span');
    const titleRect = title.getBoundingClientRect();
    const titleCenterX = titleRect.left + titleRect.width / 2;
    const titleCenterY = titleRect.top + titleRect.height / 2;

    letters.forEach((letter, index) => {
      const letterRect = letter.getBoundingClientRect();
      const letterCenterX = letterRect.left + letterRect.width / 2;
      const letterCenterY = letterRect.top + letterRect.height / 2;

      const distanceX = (e.clientX - letterCenterX) / 15;
      const distanceY = (e.clientY - letterCenterY) / 15;
      const distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));

      // Calculate magnetic pull based on distance
      const pull = Math.min(50 / (distance + 10), 10);
      const moveX = distanceX * pull * -0.2;
      const moveY = distanceY * pull * -0.2;

      letter.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(${1 + pull/30})`;
    });
  });

  // Reset magnetic effect
  title.addEventListener('mouseleave', () => {
    const letters = title.querySelectorAll('span');
    letters.forEach(letter => {
      letter.style.transform = '';
    });
  });
}

// Generate random color for interactive elements
function getRandomColor(alpha = 1) {
  const colors = [
    'rgba(189, 147, 249, ' + alpha + ')',
    'rgba(255, 158, 219, ' + alpha + ')',
    'rgba(162, 57, 234, ' + alpha + ')',
    'rgba(107, 44, 191, ' + alpha + ')'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Create burst effect for title character hover
function createCharacterBurst(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 10; i++) {
    const particle = document.createElement('div');
    particle.className = 'character-particle';

    const size = Math.random() * 6 + 2;
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 60 + 20;
    const duration = Math.random() * 1 + 0.5;
    const color = getRandomColor(0.8);

    particle.style.cssText = `
      position: fixed;
      top: ${centerY}px;
      left: ${centerX}px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      animation: particleFly ${duration}s ease-out forwards;
    `;

    document.body.appendChild(particle);

    // Set final position via animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes particleFly {
        0% { 
          transform: translate(-50%, -50%) scale(1); 
          opacity: 1;
        }
        100% { 
          transform: translate(
            calc(-50% + ${Math.cos(angle) * distance}px), 
            calc(-50% + ${Math.sin(angle) * distance}px)
          ) scale(0); 
          opacity: 0;
        }
      }
    `;

    document.head.appendChild(style);

    // Clean up after animation
    setTimeout(() => {
      document.body.removeChild(particle);
      document.head.removeChild(style);
    }, duration * 1000);
  }
}

// Enhanced tab switching with advanced animations
function initTabSystem() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const tabsContainer = document.querySelector('.tabs');

  // Add indicator element for active tab
  const indicator = document.createElement('div');
  indicator.className = 'tab-indicator';
  indicator.style.cssText = `
    position: absolute;
    bottom: -2px;
    height: 4px;
    background: linear-gradient(90deg, #8B5CF6, #6D28D9);
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    z-index: 2;
    border-radius: 4px;
    filter: drop-shadow(0 0 8px rgba(109, 40, 217, 0.7));
  `;
  tabsContainer.appendChild(indicator);

  // Set initial position of indicator
  const activeTab = document.querySelector('.tab-btn.active');
  if (activeTab) {
    updateIndicator(activeTab);
  }

  // Fix tab pane positioning to ensure they're stacked properly
  tabPanes.forEach(pane => {
    if (!pane.classList.contains('active')) {
      pane.style.position = 'absolute';
      pane.style.visibility = 'hidden';
      pane.style.opacity = '0';
    } else {
      pane.style.position = 'relative';
      pane.style.visibility = 'visible';
      pane.style.opacity = '1';
    }
  });
  
  // Fix for tab content positioning - ensure consistent height
  const tabContent = document.querySelector('.tab-content');
  if (tabContent) {
    // Set minimum height based on the tallest tab pane
    let maxHeight = 0;
    tabPanes.forEach(pane => {
      // Temporarily make it visible and get height
      const originalPosition = pane.style.position;
      const originalVisibility = pane.style.visibility;
      const originalOpacity = pane.style.opacity;
      
      pane.style.position = 'absolute';
      pane.style.visibility = 'hidden';
      pane.style.display = 'block';
      pane.style.opacity = '0';
      
      const height = pane.scrollHeight;
      if (height > maxHeight) {
        maxHeight = height;
      }
      
      // Restore original state
      pane.style.position = originalPosition;
      pane.style.visibility = originalVisibility;
      pane.style.opacity = originalOpacity;
      
      if (!pane.classList.contains('active')) {
        pane.style.display = 'none';
      }
    });
    
    // Set minimum height to accommodate all tabs
    tabContent.style.minHeight = (maxHeight + 40) + 'px';
  }

  // Advanced tab click effect with ripple
  tabButtons.forEach(button => {
    // Add ripple effect container
    button.style.position = 'relative';
    button.style.overflow = 'hidden';

    button.addEventListener('click', (e) => {
      const targetTab = button.dataset.tab;

      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;

      ripple.style.cssText = `
        position: absolute;
        top: ${e.clientY - rect.top}px;
        left: ${e.clientX - rect.left}px;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
        transform: translate(-50%, -50%) scale(0);
        border-radius: 50%;
        opacity: 0.6;
        z-index: 0;
        animation: tabRipple 0.6s ease-out forwards;
      `;

      button.appendChild(ripple);

      // Timed removal of ripple
      setTimeout(() => {
        if (ripple.parentNode === button) {
          button.removeChild(ripple);
        }
      }, 600);

      // Update indicator position
      updateIndicator(button);

      // Update active state for buttons with 3D rotation effect
      tabButtons.forEach(btn => {
        if (btn !== button) {
          btn.classList.remove('active');
          btn.style.transform = 'translateY(0) translateZ(0) rotateX(0)';
        }
      });

      button.classList.add('active');
      button.style.transform = 'translateY(-5px) translateZ(10px) rotateX(5deg)';

      // Add exit animation with 3D effect
      tabPanes.forEach(pane => {
        if (pane.classList.contains('active')) {
          pane.style.transform = 'translateY(40px) rotateX(-15deg)';
          pane.style.opacity = '0';
          pane.style.filter = 'blur(10px)';

          setTimeout(() => {
            pane.classList.remove('active');
            pane.style.position = 'absolute';
            pane.style.visibility = 'hidden';
            pane.style.display = 'none';

            // Show the selected tab with entrance animation
            const activePane = document.getElementById(targetTab);
            if (activePane) {
              activePane.style.display = 'block';
              activePane.style.position = 'relative';
              activePane.style.visibility = 'visible';
              activePane.classList.add('active');
              activePane.style.transform = 'translateY(0) rotateX(0)';
              activePane.style.opacity = '1';
              activePane.style.filter = 'blur(0)';

              // Animate each child element with staggered delay
              const children = activePane.children;
              for (let i = 0; i < children.length; i++) {
                children[i].style.opacity = '0';
                children[i].style.transform = 'translateY(20px)';

                setTimeout(() => {
                  children[i].style.opacity = '1';
                  children[i].style.transform = 'translateY(0)';
                }, 100 + (i * 70));
              }
            }
          }, 300);
        }
      });
    });
  });

  // Add hover interaction for tabs
  tabButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
      if (!button.classList.contains('active')) {
        button.style.transform = 'translateY(-3px) translateZ(5px)';
      }
    });

    button.addEventListener('mouseout', () => {
      if (!button.classList.contains('active')) {
        button.style.transform = 'translateY(0) translateZ(0)';
      }
    });
  });

  // Function to update indicator position
  function updateIndicator(activeButton) {
    const rect = activeButton.getBoundingClientRect();
    const containerRect = tabsContainer.getBoundingClientRect();

    indicator.style.width = `${rect.width - 10}px`;
    indicator.style.left = `${rect.left - containerRect.left + 5}px`;
  }

  // Update indicator on window resize
  window.addEventListener('resize', () => {
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab) {
      updateIndicator(activeTab);
    }
  });

  // Add keyframe for ripple effect
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    @keyframes tabRipple {
      0% { transform: translate(-50%, -50%) scale(0); opacity: 0.6; }
      100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
    }
  `;
  document.head.appendChild(rippleStyle);

  // Initialize FAQ accordions
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const wasActive = item.classList.contains('active');

      // Close all items first
      faqItems.forEach(faqItem => {
        faqItem.classList.remove('active');
      });

      // Toggle the clicked item
      if (!wasActive) {
        item.classList.add('active');
      }
    });
  });

  // Copy button functionality
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const scriptName = button.previousElementSibling.textContent;

      // Visual feedback
      const originalIcon = button.innerHTML;
      button.innerHTML = '<i class="fas fa-check"></i>';

      setTimeout(() => {
        button.innerHTML = originalIcon;
      }, 1500);

      // Simulated copy functionality
      console.log(`Copied script: ${scriptName}`);
    });
  });
}

// Enhanced surplus logo animations with improved effects
function animateSurplusLogo() {
  const surplusLogo = document.querySelector('.surplus-logo');

  if (!surplusLogo) return;

  // Add holographic overlay to logo
  const holoOverlay = document.createElement('div');
  holoOverlay.className = 'holographic-overlay';
  holoOverlay.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(255,255,255,0) 0%,
      rgba(255,255,255,0.1) 25%, 
      rgba(255,158,219,0.2) 50%, 
      rgba(162,57,234,0.1) 75%, 
      rgba(255,255,255,0) 100%
    );
    mix-blend-mode: overlay;
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
    animation: holoShift 5s linear infinite;
  `;

  const logoContainer = surplusLogo.parentElement;
  logoContainer.style.position = 'relative';
  logoContainer.appendChild(holoOverlay);

  // Add rainbow halo effect
  const rainbowHalo = document.createElement('div');
  rainbowHalo.className = 'rainbow-halo';
  rainbowHalo.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    width: 150%;
    height: 150%;
    background: conic-gradient(
      #ff9edb, #a239ea, #6b2cbf, #c9a0ff, #ff9edb
    );
    border-radius: 50%;
    z-index: -1;
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0;
    filter: blur(20px);
    transition: all 0.5s ease;
  `;
  logoContainer.appendChild(rainbowHalo);

  // Add keyframe animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes holoShift {
      0% { background-position: 0% 0%; }
      100% { background-position: 200% 200%; }
    }

    @keyframes pulseHalo {
      0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.3; }
      50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.7; }
      100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.3; }
    }

    @keyframes glitchEffect {
      0% { 
        clip-path: inset(30% 0 30% 0);
        transform: translate(-5px, 0);
      }
      5% { 
        clip-path: inset(60% 0 1% 0);
        transform: translate(5px, 0);
      }
      10% { 
        clip-path: inset(1% 0 98% 0);
        transform: translate(-5px, 0);
      }
      15% { 
        clip-path: inset(25% 0 58% 0);
        transform: translate(5px, 0);
      }
      20% { 
        clip-path: inset(75% 0 5% 0);
        transform: translate(-5px, 0);
      }
      25% { 
        clip-path: inset(0% 0 0% 0);
        transform: translate(0, 0);
      }
      100% { 
        clip-path: inset(0% 0 0% 0);
        transform: translate(0, 0);
      }
    }
  `;
  document.head.appendChild(style);

  // Add hover effects
  logoContainer.addEventListener('mouseenter', () => {
    holoOverlay.style.opacity = '1';
    rainbowHalo.style.opacity = '0.7';
    rainbowHalo.style.animation = 'pulseHalo 3s ease infinite';
    surplusLogo.style.filter = 'drop-shadow(0 0 25px rgba(255, 158, 219, 0.9))';
  });

  logoContainer.addEventListener('mouseleave', () => {
    holoOverlay.style.opacity = '0';
    rainbowHalo.style.opacity = '0';
    rainbowHalo.style.animation = '';
    surplusLogo.style.filter = '';
  });

  // Add click interaction with advanced effects
  surplusLogo.addEventListener('click', () => {
    // Add burst effect
    const burst = document.createElement('div');
    burst.className = 'logo-burst';
    document.body.appendChild(burst);

    const rect = surplusLogo.getBoundingClientRect();
    burst.style.left = rect.left + rect.width/2 + 'px';
    burst.style.top = rect.top + rect.height/2 + 'px';

    // Add explosion animation
    setTimeout(() => document.body.removeChild(burst), 1000);

    // Trigger floating particles with enhanced effects
    createExtraParticles(rect.left + rect.width/2, rect.top + rect.height/2, true);

    // Add shockwave effect
    createShockwave(rect.left + rect.width/2, rect.top + rect.height/2);
  });

  // Add gentle 3D rotation on mouse move
  logoContainer.addEventListener('mousemove', (e) => {
    const rect = logoContainer.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;

    // Calculate rotation with reduced intensity
    const multiplier = 10; // Reduced from 20 for subtler effect
    const rotateX = -y / rect.height * multiplier;
    const rotateY = x / rect.width * multiplier;

    surplusLogo.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

    // Update holographic effect based on angle
    const hue = 260 + (x+ y) / (rect.width + rect.height) * 60;
    holoOverlay.style.background = `linear-gradient(${135 + (x/rect.width)*90}deg, 
      rgba(255,255,255,0) 0%,
      rgba(255,255,255,0.1) 25%, 
      rgba(${255-hue},158,219,0.2) 50%, 
      rgba(${hue-100},57234,0.1) 75%, 
      rgba(255,255,255,0) 100%
    )`;
  });

  logoContainer.addEventListener('mouseleave', () => {
    surplusLogo.style.transform = '';
  });
}

// Create shockwave effect
function createShockwave(x, y) {
  const shockwave = document.createElement('div');
  shockwave.className = 'shockwave';
  shockwave.style.cssText = `
    position: fixed;
    top: ${y}px;
    left: ${x}px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255,255,255,0);
    box-shadow: 0 0 0 0 rgba(162, 57, 234, 0.5);
    transform: translate(-50%, -50%);
    z-index: 9999;
    pointer-events: none;
    animation: shockwaveExpand 1s cubic-bezier(0, 0.5, 0.25, 1) forwards;
  `;
  document.body.appendChild(shockwave);

  // Add keyframe for shockwave
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shockwaveExpand {
      0% {
        box-shadow: 0 0 0 0 rgba(162, 57, 234, 0.5);
        border: 2px solid rgba(255, 158, 219, 0.8);
      }
      70% {
        box-shadow: 0 0 0 50px rgba(162, 57, 234, 0);
        border: 2px solid rgba(255, 158, 219, 0.1);
      }
      100% {
        box-shadow: 0 0 0 100px rgba(162, 57, 234, 0);
        border: 2px solid rgba(255, 158, 219, 0);
      }
    }
  `;
  document.head.appendChild(style);

  // Remove after animation
  setTimeout(() => {
    document.body.removeChild(shockwave);
    document.head.removeChild(style);
  }, 1100);
}

// Create explosion particles with enhanced effects
function createExtraParticles(x, y, enhanced = false) {
  const particlesContainer = document.querySelector('.floating-particles');
  const particleCount = enhanced ? 30 : 15;

  // Generate unique animation name to prevent conflicts
  const animationName = 'explode' + Math.floor(Math.random() * 10000);

  // Create a single style element for all particles
  const style = document.createElement('style');
  let keyframes = '';

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');

    // Randomize particle properties
    const size = Math.random() * 8 + 3;
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 150 + 50;
    const duration = Math.random() * 2 + 1;
    const delay = Math.random() * 0.3;

    // Enhanced color options
    let particleColor;
    if (enhanced) {
      // Create gradient or glowing particles for enhanced effect
      const hue = Math.floor(Math.random() * 60) + 260; // Purple to pink range
      particleColor = `radial-gradient(circle, 
        hsla(${hue}, 100%, 80%, 1) 0%, 
        hsla(${hue}, 100%, 70%, 0.8) 50%, 
        hsla(${hue}, 100%, 60%, 0) 100%)`;
    } else {
      particleColor = Math.random() > 0.5 ? '#ff9edb' : '#a239ea';
    }

    // Set the final position based on angle and distance
    const finalX = Math.cos(angle) * distance;
    const finalY = Math.sin(angle) * distance;

    // Calculate multiple control points for bezier path
    const cp1x = Math.cos(angle + Math.PI/4) * distance * 0.3;
    const cp1y = Math.sin(angle + Math.PI/4) * distance * 0.3;
    const cp2x = Math.cos(angle - Math.PI/4) * distance * 0.6;
    const cp2y = Math.sin(angle - Math.PI/4) * distance * 0.6;

    // Add unique identifier to this particle
    const particleId = 'particle' + i + '_' + Math.floor(Math.random() * 1000);

    // Apply styles with enhanced effects
    particle.id = particleId;
    particle.style.cssText = `
      position: absolute;
      top: ${y}px;
      left: ${x}px;
      width: ${size}px;
      height: ${size}px;
      background: ${particleColor};
      border-radius: 50%;
      opacity: 0.8;
      pointer-events: none;
      box-shadow: 0 0 ${size * 2}px rgba(189, 147, 249, 0.8);
      animation: ${animationName}${i} ${duration}s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s forwards;
      transform: translate(0, 0) scale(1);
      will-change: transform, opacity;
    `;

    // Add custom keyframe for this particle with bezier path
    keyframes += `
      @keyframes ${animationName}${i} {
        0% { transform: translate(0, 0) scale(1); opacity: 0.8; }
        40% { transform: translate(${cp1x}px, ${cp1y}px) scale(${enhanced ? 1.5 : 1.2}); opacity: ${enhanced ? 1 : 0.8}; }
        60% { transform: translate(${cp2x}px, ${cp2y}px) scale(${enhanced ? 1.2 : 0.9}); opacity: 0.6; }
        100% { transform: translate(${finalX}px, ${finalY}px) scale(0); opacity: 0; }
      }
    `;

    particlesContainer.appendChild(particle);

    // Enhanced particles have trail effect
    if (enhanced && size > 6) {
      // Create particle trail
      createParticleTrail(particle, duration, particleId);
    }

    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode === particlesContainer) {
        particlesContainer.removeChild(particle);
      }
    }, (duration + delay) * 1000);
  }

  // Add all keyframes at once
  style.textContent = keyframes;
  document.head.appendChild(style);

  // Remove style element after longest possible duration
  setTimeout(() => {
    if (document.head.contains(style)) {
      document.head.removeChild(style);
    }
  }, 3500); // Maximum duration + delay + buffer

  // Add spectacular light burst for enhanced effect
  if (enhanced) {
    const lightBurst = document.createElement('div');
    lightBurst.className = 'light-burst';
    lightBurst.style.cssText = `
      position: fixed;
      top: ${y}px;
      left: ${x}px;
      width: 4px;
      height: 4px;
      background: white;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 40px 20px rgba(255, 255, 255, 0.8),
                  0 0 100px 50px rgba(162, 57, 234, 0.5);
      z-index: 9998;
      pointer-events: none;
      animation: lightBurstAnimation 0.6s cubic-bezier(0.1, 0.6, 0.3, 1) forwards;
    `;
    document.body.appendChild(lightBurst);

    // Add keyframe for light burst
    const burstStyle = document.createElement('style');
    burstStyle.textContent = `
      @keyframes lightBurstAnimation {
        0% { transform: translate(-50%, -50%) scale(0.1); opacity: 1; }
        50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.8; 
              box-shadow: 0 0 60px 30px rgba(255, 255, 255, 0.9),
                          0 0 120px 60px rgba(162, 57, 234, 0.7); }
        100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
      }
    `;
    document.head.appendChild(burstStyle);

    // Remove after animation
    setTimeout(() => {
      if (document.body.contains(lightBurst)) {
        document.body.removeChild(lightBurst);
      }
      if (document.head.contains(burstStyle)) {
        document.head.removeChild(burstStyle);
      }
    }, 600);
  }
}

// Create a trail effect for particles
function createParticleTrail(particle, duration, parentId) {
  const trailCount = 5;
  const trailDuration = duration * 0.8; // Trail lasts 80% of the particle duration
  const trailDelay = duration * 0.1; // Start after 10% of the particle animation

  // Add the trail elements
  for (let i = 0; i < trailCount; i++) {
    setTimeout(() => {
      if (!document.getElementById(parentId)) return; // Parent particle is gone

      const trail = document.createElement('div');
      const parentRect = particle.getBoundingClientRect();

      trail.style.cssText = `
        position: absolute;
        top: ${parentRect.top + parentRect.height/2}px;
        left: ${parentRect.left + parentRect.width/2}px;
        width: ${parentRect.width * 0.8}px;
        height: ${parentRect.height * 0.8}px;
        background: ${particle.style.background};
        border-radius: 50%;
        opacity: 0.5;
        pointer-events: none;
        z-index: ${parseInt(particle.style.zIndex) - 1};
        transform: translate(-50%, -50%) scale(0.8);
        animation: fadeTrail ${trailDuration * 0.4}s linear forwards;
      `;

      document.body.appendChild(trail);

      // Remove trail after animation
      setTimeout(() => {
        if (document.body.contains(trail)) {
          document.body.removeChild(trail);
        }
      }, trailDuration * 400);
    }, trailDelay * 1000 + (i * (duration * 1000 * 0.1)));
  }

  // Add keyframe for trail
  const trailStyle = document.createElement('style');
  trailStyle.textContent = `
    @keyframes fadeTrail {
      0% { opacity: 0.5; transform: translate(-50%, -50%) scale(0.8); }
      100% { opacity: 0; transform: translate(-50%, -50%) scale(0.2); }
    }
  `;
  document.head.appendChild(trailStyle);

  // Remove style after all trails are done
  setTimeout(() => {
    if (document.head.contains(trailStyle)) {
      document.head.removeChild(trailStyle);
    }
  }, (duration + trailDelay + 0.5) * 1000);
}

// Enhanced scrolling effects
function addScrollEffects() {
  const cards = document.querySelectorAll('.feature-card, .script-item, .faq-item');

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight;

    cards.forEach(card => {
      const cardPosition = card.offsetTop + card.offsetHeight / 2;

      if (scrollPosition > cardPosition) {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.opacity = '1';
      } else {
        card.style.transform = 'translateY(20px) scale(0.95)';
        card.style.opacity = '0.7';
      }
    });
  });

  // Initialize card styles
  cards.forEach(card => {
    card.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    card.style.transform = 'translateY(20px) scale(0.95)';
    card.style.opacity = '0.7';
  });
}

// Interactive cursor trail effect
function addCursorTrail() {
  const trailContainer = document.createElement('div');
  trailContainer.className = 'cursor-trail';
  trailContainer.style.position = 'fixed';
  trailContainer.style.top = '0';
  trailContainer.style.left = '0';
  trailContainer.style.width = '100%';
  trailContainer.style.height = '100%';
  trailContainer.style.pointerEvents = 'none';
  trailContainer.style.zIndex = '9999';
  document.body.appendChild(trailContainer);

  let dots = [];
  const maxDots = 15;

  document.addEventListener('mousemove', (e) => {
    // Create new dot
    const dot = document.createElement('div');
    dot.className = 'trail-dot';
    const size = Math.random() * 15 + 5;
    const hue = Math.floor(Math.random() * 60) + 270; // Purple to pink range

    dot.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: hsla(${hue}, 100%, 70%, 0.7);
      border-radius: 50%;
      top: ${e.clientY}px;
      left: ${e.clientX}px;
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.7;
      pointer-events: none;
      transition: all 0.5s ease;
      box-shadow: 0 0 ${size}px hsla(${hue}, 100%, 70%, 0.5);
    `;

    trailContainer.appendChild(dot);
    dots.push(dot);

    // Animate dot
    setTimeout(() => {
      dot.style.transform = 'translate(-50%, -50%) scale(0)';
      dot.style.opacity = '0';
    }, 10);

    // Remove dot after animation
    setTimeout(() => {
      if (dot.parentNode === trailContainer) {
        trailContainer.removeChild(dot);
      }
      dots = dots.filter(d => d !== dot);
    }, 500);

    // Limit number of dots
    if (dots.length > maxDots) {
      if (dots[0].parentNode === trailContainer) {
        trailContainer.removeChild(dots[0]);
      }
      dots.shift();
    }
  });
}

// Add interactive wave effect on glass card
function addCardInteraction() {
  const card = document.querySelector('.glass-card');

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate ripple position
    const posX = (x / rect.width) * 100;
    const posY = (y / rect.height) * 100;

    // Add custom property for ripple shader effect
    card.style.setProperty('--ripple-x', posX + '%');
    card.style.setProperty('--ripple-y', posY + '%');

    // Add 3D rotation effect
    const rotateX = ((y / rect.height) - 0.5) * 10;
    const rotateY = ((x / rect.width) - 0.5) * -10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) scale(1.02)`;

    // Lighting effect
    const brightness = 100 + ((y / rect.height) * 20);
    card.style.filter = `brightness(${brightness}%)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.filter = '';
  });

  // Add ripple shader styles
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    .glass-card {
      position: relative;
      overflow: hidden;
    }

    .glass-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(
        circle at var(--ripple-x, 50%) var(--ripple-y, 50%),
        rgba(255, 255, 255, 0.2) 0%,
        rgba(255, 255, 255, 0.1) 20%,
        rgba(255, 255, 255, 0) 60%
      );
      opacity: 0;
      transition: opacity 0.5s;
      pointer-events: none;
      z-index: 1;
    }

    .glass-card:hover::before {
      opacity: 1;
    }
  `;
  document.head.appendChild(rippleStyle);
}

// Enhanced particle system with interactions
function enhanceParticleSystem() {
  const particles = document.querySelectorAll('.floating-particles div');

  // Mouse attraction for particles
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    particles.forEach(particle => {
      const rect = particle.getBoundingClientRect();
      const particleX = rect.left + rect.width/2;
      const particleY = rect.top + rect.height/2;

      // Calculate distance
      const distX = mouseX - particleX;
      const distY = mouseY - particleY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      // Only affect particles within a certain radius
      if (distance < 150) {
        const force = 50 / (distance + 1);
        const moveX = (distX / distance) * force;
        const moveY = (distY / distance) * force;

        // Get current transform and add attraction force
        particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        particle.style.transition = 'transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      } else {
        particle.style.transform = '';
        particle.style.transition = 'transform 2s ease';
      }
    });
  });
}

// Initialize gallery interactions
function initGalleryInteractions() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  let modalCreated = false;
  let currentModal = null;
  let lastClickedItem = null; // Track last clicked item for navigation

  // Create the modal structure with enhanced effects
  function createModal() {
    if (modalCreated) return;

    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="modal-content">
          <div class="modal-close"></div>
          <img class="modal-image" src="" alt="">
          <div class="modal-caption">
            <h3 class="modal-title"></h3>
            <p class="modal-description"></p>
          </div>
          <div class="modal-controls">
            <button class="modal-prev"><i class="fas fa-chevron-left"></i></button>
            <button class="modal-next"><i class="fas fa-chevron-right"></i></button>
          </div>
          <div class="modal-progress"></div>
        </div>
      `;

    document.body.appendChild(modal);
    currentModal = modal;

    // Add close functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
      closeModal(modal);
    });

    // Close on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal(modal);
      } else if (e.key === 'ArrowRight' && modal.classList.contains('active')) {
        navigateModal('next');
      } else if (e.key === 'ArrowLeft' && modal.classList.contains('active')) {
        navigateModal('prev');
      }
    });

    // Add navigation buttons functionality
    const prevBtn = modal.querySelector('.modal-prev');
    const nextBtn = modal.querySelector('.modal-next');

    prevBtn.addEventListener('click', () => navigateModal('prev'));
    nextBtn.addEventListener('click', () => navigateModal('next'));

    modalCreated = true;
  }

  // Navigate between images in modal
  function navigateModal(direction) {
    if (!lastClickedItem) return;

    const allItems = Array.from(document.querySelectorAll('.gallery-item'));
    const currentIndex = allItems.indexOf(lastClickedItem);
    let newIndex;

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % allItems.length;
    } else {
      newIndex = (currentIndex - 1 + allItems.length) % allItems.length;
    }

    const newItem = allItems[newIndex];
    lastClickedItem = newItem;

    // Get item data
    const image = newItem.querySelector('.gallery-image');
    const title = newItem.dataset.title || '';
    const description = newItem.dataset.description || '';

    // Update modal content with animation
    const modal = currentModal;
    const modalImage = modal.querySelector('.modal-image');
    const modalTitle = modal.querySelector('.modal-title');
    const modalDesc = modal.querySelector('.modal-description');

    // Create transition effect
    modalImage.style.opacity = '0';
    modalImage.style.transform = direction === 'next' ? 'translateX(50px)' : 'translateX(-50px)';

    setTimeout(() => {
      // Update content
      modalImage.src = image.src;
      modalTitle.textContent = title;
      modalDesc.textContent = description;

      // Update progress indicator
      updateProgressIndicator(newIndex, allItems.length);

      // Show with animation
      setTimeout(() => {
        modalImage.style.opacity = '1';
        modalImage.style.transform = 'translateX(0)';
      }, 50);
    }, 300);

    // Create transition effect for item
    createGlitchEffect(newItem.querySelector('.gallery-image'));
    createExtraParticles(window.innerWidth/2, window.innerHeight/2, false);
  }

  // Update progress indicator
  function updateProgressIndicator(currentIndex, totalItems) {
    const progressContainer = currentModal.querySelector('.modal-progress');
    progressContainer.innerHTML = '';

    for (let i = 0; i < totalItems; i++) {
      const dot = document.createElement('span');
      dot.className = 'progress-dot' + (i === currentIndex ? ' active' : '');
      progressContainer.appendChild(dot);
    }
  }

  // Add shine effect element to gallery items
  galleryItems.forEach(item => {
    const shine = document.createElement('div');
    shine.className = 'gallery-shine';
    item.appendChild(shine);

    // Add 3D tilt effect
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate position relative to center (from -1 to 1)
      const xRatio = (x / rect.width) * 2 - 1;
      const yRatio = (y / rect.height) * 2 - 1;

      // Apply rotations (max 15 degrees)
      const maxRotation = 15;
      item.style.transform = `
        perspective(1000px) 
        rotateY(${xRatio * maxRotation}deg) 
        rotateX(${-yRatio * maxRotation}deg)
        translateZ(30px)
        scale(1.05)
      `;

      // Move light reflection effect based on mouse position
      const overlay = item.querySelector('.gallery-overlay');
      overlay.style.background = `
        linear-gradient(
          ${120 + xRatio * 30}deg,
          rgba(41, 20, 82, 0.8) 0%, 
          rgba(41, 20, 82, 0.4) 40%, 
          rgba(${255 - Math.abs(xRatio) * 50}, ${158 + yRatio * 30}, ${219 + xRatio * 30}, 0.6) 50%,
          rgba(41, 20, 82, 0.4) 60%,
          rgba(41, 20, 82, 0.8) 100%
        )
      `;

      // Create dynamic highlight effect
      const shineX = (x / rect.width) * 100;
      const shineY = (y / rect.height) * 100;
      shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)`;
      shine.style.opacity = '1';
    });

    // Reset on mouse leave
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
      const overlay = item.querySelector('.gallery-overlay');
      overlay.style.background = '';
      shine.style.opacity = '0';
    });

    // Add click effects and open modal
    item.addEventListener('click', (e) => {
      // Prevent multiple clicks
      if (item.classList.contains('clicked')) return;

      // Add clicked class for animation
      item.classList.add('clicked');
      lastClickedItem = item; // Update last clicked item

      // Get item data
      const image = item.querySelector('.gallery-image');
      const title = item.querySelector('.gallery-title')?.textContent || '';
      const description = item.querySelector('.gallery-description')?.textContent || '';

      // Get coordinates for effects
      const rect = item.getBoundingClientRect();
      const centerX = rect.left + rect.width/2;
      const centerY = rect.top + rect.height/2;

      // Create ripple effects
      createExtraParticles(centerX, centerY, true);
      createShockwave(centerX, centerY);

      // Add glitch effect to image
      if (image) {
        createGlitchEffect(image);

        // Scale up quickly
        image.style.transform = 'scale(1.3)';

        // Delayed modal opening for better effect
        setTimeout(() => {
          // Open the modal with the image data
          openModal(image.src, title, description);
          updateProgressIndicator(Array.from(document.querySelectorAll('.gallery-item')).indexOf(item), document.querySelectorAll('.gallery-item').length);

          // Reset animation class after effect completes
          setTimeout(() => {
            item.classList.remove('clicked');
            image.style.transform = '';
          }, 300);
        }, 300);
      }
    });
  });

  // Add animation for section title
  const sectionTitle = document.querySelector('.section-title');
  if (sectionTitle) {
    // Add 3D letters similar to main title
    const text = sectionTitle.textContent;
    sectionTitle.textContent = '';
    sectionTitle.setAttribute('aria-label', text);

    for (let i = 0; i < text.length; i++) {
      const letterSpan = document.createElement('span');
      letterSpan.textContent = text[i];
      letterSpan.style.cssText = `
        display: inline-block;
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        animation: sectionLetterFloat 3s ease-in-out ${i * 0.08}s infinite alternate;
        position: relative;
        text-shadow: 0 0 10px rgba(162, 57, 234, 0.3);
      `;

      // Add colored glow to each letter
      const hue = 270 + (i * 5) % 60; // Different color for each letter in the purple-pink range
      letterSpan.addEventListener('mouseover', () => {
        letterSpan.style.color = `hsl(${hue}, 100%, 75%)`;
        letterSpan.style.transform = 'scale(1.2) translateY(-15px)';
        letterSpan.style.textShadow = `0 0 15px hsla(${hue}, 100%, 70%, 0.8)`;

        // Create mini particles
        const rect = letterSpan.getBoundingClientRect();
        createLetterParticles(rect.left + rect.width/2, rect.top + rect.height/2, hue);
      });

      letterSpan.addEventListener('mouseout', () => {
        letterSpan.style.color = '';
        letterSpan.style.transform = '';
        letterSpan.style.textShadow = '';
      });

      sectionTitle.appendChild(letterSpan);
    }

    // Add animation keyframes with improved float effect
    const style = document.createElement('style');
    style.textContent = `
      @keyframes sectionLetterFloat {
        0% { transform: translateY(0) rotateZ(0deg); }
        25% { transform: translateY(-5px) rotateZ(1deg); }
        50% { transform: translateY(-12px) rotateZ(-1deg); }
        75% { transform: translateY(-8px) rotateZ(0.5deg); }
        100% { transform: translateY(-10px) rotateZ(-0.5deg); }
      }
    `;
    document.head.appendChild(style);
  }

  // Create particles for section title letters
  function createLetterParticles(x, y, hue) {
    const count = 5 + Math.floor(Math.random() * 5);

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 5 + 2;
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 40 + 10;
      const duration = Math.random() * 1 + 0.5;

      particle.style.cssText = `
        position: fixed;
        top: ${y}px;
        left: ${x}px;
        width: ${size}px;
        height: ${size}px;
        background: hsla(${hue}, 100%, 75%, 0.8);
        border-radius: 50%;
        z-index: 9999;
        pointer-events: none;
        box-shadow: 0 0 ${size * 2}px hsla(${hue}, 100%, 70%, 0.8);
        transform: translate(-50%, -50%);
        animation: letterParticle ${duration}s cubic-bezier(0.42, 0, 0.58, 1) forwards;
      `;

      document.body.appendChild(particle);

      // Create keyframes for this particle
      const style = document.createElement('style');
      style.textContent = `
        @keyframes letterParticle {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          100% { 
            transform: translate(
              calc(-50% + ${Math.cos(angle) * distance}px),
              calc(-50% + ${Math.sin(angle) * distance}px)
            ) scale(0);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);

      // Clean up
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
        if (style.parentNode) {
          style.parentNode.removeChild(style);
        }
      }, duration * 1000);
    }
  }

  // Add reflection to gallery items
  function addGalleryReflections() {
    galleryItems.forEach(item => {
      // Create a reflection div
      const reflection = document.createElement('div');
      reflection.className = 'gallery-reflection';
      reflection.style.cssText = `
        position: absolute;
        bottom: -80px;
        left: 0;
        width: 100%;
        height: 80px;
        background: linear-gradient(to bottom, rgba(41, 20, 82, 0.6), rgba(41, 20, 82, 0));
        transform: scaleY(-1);
        opacity: 0.3;
        pointer-events: none;
        transition: all 0.3s ease;
        z-index: -1;
      `;

      // Add reflection to non-gallery-container parent
      const parent = item.parentNode;
      parent.style.position = 'relative';
      parent.style.marginBottom = '40px';
      parent.appendChild(reflection);

      // Update reflection on hover
      item.addEventListener('mouseover', () => {
        reflection.style.opacity = '0.5';
        reflection.style.filter = 'blur(2px)';
      });

      item.addEventListener('mouseleave', () => {
        reflection.style.opacity = '0.3';
        reflection.style.filter = 'blur(4px)';
      });
    });
  }

  // Initialize reflections
  addGalleryReflections();
}

// Open modal with image data and enhanced animations
function openModal(imageSrc, title, description) {
  createModal();

  const modal = currentModal;
  const modalContent = modal.querySelector('.modal-content');
  const modalImage = modal.querySelector('.modal-image');
  const modalTitle = modal.querySelector('.modal-title');
  const modalDesc = modal.querySelector('.modal-description');

  // Set content
  modalImage.src = imageSrc;
  modalTitle.textContent = title;
  modalDesc.textContent = description;

  // Prepare elements for animation
  modalImage.style.opacity = '0';
  modalImage.style.transform = 'scale(0.9) translateY(20px)';
  modalImage.style.filter = 'blur(10px)';

  modalTitle.style.opacity = '0';
  modalTitle.style.transform = 'translateY(-20px)';

  modalDesc.style.opacity = '0';
  modalDesc.style.transform = 'translateY(20px)';

  // Show modal
  modal.classList.add('active');

  // Add radial animation from center
  const rect = modalContent.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const radialRipple = document.createElement('div');
  radialRipple.style.cssText = `
    position: absolute;
    top: ${centerY}px;
    left: ${centerX}px;
    width: 5px;
    height: 5px;
    background: radial-gradient(circle, 
      rgba(162, 57, 234, 0.4) 0%, 
      rgba(162, 57, 234, 0.2) 50%, 
      rgba(162, 57, 234, 0) 70%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    opacity: 1;
    z-index: 0;
    animation: modalRadialRipple 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  `;

  modalContent.appendChild(radialRipple);

  // Create ripple animation
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    @keyframes modalRadialRipple {
      0% { width: 5px; height: 5px; opacity: 1; }
      100% { width: ${Math.max(rect.width, rect.height) * 2}px; height: ${Math.max(rect.width, rect.height) * 2}px; opacity: 0; }
    }
  `;
  document.head.appendChild(rippleStyle);

  // Animate in with sequence
  setTimeout(() => {
    modalImage.style.opacity = '1';
    modalImage.style.transform = 'scale(1) translateY(0)';
    modalImage.style.filter = 'blur(0)';

    setTimeout(() => {
      modalTitle.style.opacity = '1';
      modalTitle.style.transform = 'translateY(0)';

      setTimeout(() => {
        modalDesc.style.opacity = '1';
        modalDesc.style.transform = 'translateY(0)';
      }, 100);
    }, 150);

    // Clean up ripple
    setTimeout(() => {
      if (radialRipple.parentNode) {
        radialRipple.parentNode.removeChild(radialRipple);
      }
      if (rippleStyle.parentNode) {
        rippleStyle.parentNode.removeChild(rippleStyle);
      }
    }, 800);
  }, 100);
}

// Close modal with enhanced animation
function closeModal(modal) {
  if (!modal) return;

  const modalContent = modal.querySelector('.modal-content');

  // Animate out
  modalContent.style.transform = 'scale(0.9) translateY(20px) rotateX(5deg)';
  modalContent.style.opacity = '0';
  modal.style.backdropFilter = 'blur(5px)';

  // Remove after animation completes
  setTimeout(() => {
    modal.classList.remove('active');
    // Reset transforms for next opening
    setTimeout(() => {
      modalContent.style.transform = '';
      modalContent.style.opacity = '';
      modal.style.backdropFilter = '';
    }, 100);
  }, 300);
}

// Enhanced scrolling effects
function addScrollEffects() {
  const cards = document.querySelectorAll('.feature-card, .script-item, .faq-item');

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight;

    cards.forEach(card => {
      const cardPosition = card.offsetTop + card.offsetHeight / 2;

      if (scrollPosition > cardPosition) {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.opacity = '1';
      } else {
        card.style.transform = 'translateY(20px) scale(0.95)';
        card.style.opacity = '0.7';
      }
    });
  });

  // Initialize card styles
  cards.forEach(card => {
    card.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    card.style.transform = 'translateY(20px) scale(0.95)';
    card.style.opacity = '0.7';
  });
}

// Interactive cursor trail effect
function addCursorTrail() {
  const trailContainer = document.createElement('div');
  trailContainer.className = 'cursor-trail';
  trailContainer.style.position = 'fixed';
  trailContainer.style.top = '0';
  trailContainer.style.left = '0';
  trailContainer.style.width = '100%';
  trailContainer.style.height = '100%';
  trailContainer.style.pointerEvents = 'none';
  trailContainer.style.zIndex = '9999';
  document.body.appendChild(trailContainer);

  let dots = [];
  const maxDots = 15;

  document.addEventListener('mousemove', (e) => {
    // Create new dot
    const dot = document.createElement('div');
    dot.className = 'trail-dot';
    const size = Math.random() * 15 + 5;
    const hue = Math.floor(Math.random() * 60) + 270; // Purple to pink range

    dot.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: hsla(${hue}, 100%, 70%, 0.7);
      border-radius: 50%;
      top: ${e.clientY}px;
      left: ${e.clientX}px;
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.7;
      pointer-events: none;
      transition: all 0.5s ease;
      box-shadow: 0 0 ${size}px hsla(${hue}, 100%, 70%, 0.5);
    `;

    trailContainer.appendChild(dot);
    dots.push(dot);

    // Animate dot
    setTimeout(() => {
      dot.style.transform = 'translate(-50%, -50%) scale(0)';
      dot.style.opacity = '0';
    }, 10);

    // Remove dot after animation
    setTimeout(() => {
      if (dot.parentNode === trailContainer) {
        trailContainer.removeChild(dot);
      }
      dots = dots.filter(d => d !== dot);
    }, 500);

    // Limit number of dots
    if (dots.length > maxDots) {
      if (dots[0].parentNode === trailContainer) {
        trailContainer.removeChild(dots[0]);
      }
      dots.shift();
    }
  });
}

// Add interactive wave effect on glass card
function addCardInteraction() {
  const card = document.querySelector('.glass-card');

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate ripple position
    const posX = (x / rect.width) * 100;
    const posY = (y / rect.height) * 100;

    // Add custom property for ripple shader effect
    card.style.setProperty('--ripple-x', posX + '%');
    card.style.setProperty('--ripple-y', posY + '%');

    // Add 3D rotation effect
    const rotateX = ((y / rect.height) - 0.5) * 10;
    const rotateY = ((x / rect.width) - 0.5) * -10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) scale(1.02)`;

    // Lighting effect
    const brightness = 100 + ((y / rect.height) * 20);
    card.style.filter = `brightness(${brightness}%)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.filter = '';
  });

  // Add ripple shader styles
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    .glass-card {
      position: relative;
      overflow: hidden;
    }

    .glass-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(
        circle at var(--ripple-x, 50%) var(--ripple-y, 50%),
        rgba(255, 255, 255, 0.2) 0%,
        rgba(255, 255, 255, 0.1) 20%,
        rgba(255, 255, 255, 0) 60%
      );
      opacity: 0;
      transition: opacity 0.5s;
      pointer-events: none;
      z-index: 1;
    }

    .glass-card:hover::before {
      opacity: 1;
    }
  `;
  document.head.appendChild(rippleStyle);
}

// Enhanced particle system with interactions
function enhanceParticleSystem() {
  const particles = document.querySelectorAll('.floating-particles div');

  // Mouse attraction for particles
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    particles.forEach(particle => {
      const rect = particle.getBoundingClientRect();
      const particleX = rect.left + rect.width/2;
      const particleY = rect.top + rect.height/2;

      // Calculate distance
      const distX = mouseX - particleX;
      const distY = mouseY - particleY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      // Only affect particles within a certain radius
      if (distance < 150) {
        const force = 50 / (distance + 1);
        const moveX = (distX / distance) * force;
        const moveY = (distY / distance) * force;

        // Get current transform and add attraction force
        particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        particle.style.transition = 'transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      } else {
        particle.style.transform = '';
        particle.style.transition = 'transform 2s ease';
      }
    });
  });
}

// Initialize gallery interactions
function initGalleryInteractions() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  let modalCreated = false;
  let currentModal = null;
  let lastClickedItem = null; // Track last clicked item for navigation

  // Create the modal structure with enhanced effects
  function createModal() {
    if (modalCreated) return;

    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="modal-content">
          <div class="modal-close"></div>
          <img class="modal-image" src="" alt="">
          <div class="modal-caption">
            <h3 class="modal-title"></h3>
            <p class="modal-description"></p>
          </div>
          <div class="modal-controls">
            <button class="modal-prev"><i class="fas fa-chevron-left"></i></button>
            <button class="modal-next"><i class="fas fa-chevron-right"></i></button>
          </div>
          <div class="modal-progress"></div>
        </div>
      `;

    document.body.appendChild(modal);
    currentModal = modal;

    // Add close functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
      closeModal(modal);
    });

    // Close on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal(modal);
      } else if (e.key === 'ArrowRight' && modal.classList.contains('active')) {
        navigateModal('next');
      } else if (e.key === 'ArrowLeft' && modal.classList.contains('active')) {
        navigateModal('prev');
      }
    });

    // Add navigation buttons functionality
    const prevBtn = modal.querySelector('.modal-prev');
    const nextBtn = modal.querySelector('.modal-next');

    prevBtn.addEventListener('click', () => navigateModal('prev'));
    nextBtn.addEventListener('click', () => navigateModal('next'));

    modalCreated = true;
  }

  // Navigate between images in modal
  function navigateModal(direction) {
    if (!lastClickedItem) return;

    const allItems = Array.from(document.querySelectorAll('.gallery-item'));
    const currentIndex = allItems.indexOf(lastClickedItem);
    let newIndex;

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % allItems.length;
    } else {
      newIndex = (currentIndex - 1 + allItems.length) % allItems.length;
    }

    const newItem = allItems[newIndex];
    lastClickedItem = newItem;

    // Get item data
    const image = newItem.querySelector('.gallery-image');
    const title = newItem.dataset.title || '';
    const description = newItem.dataset.description || '';

    // Update modal content with animation
    const modal = currentModal;
    const modalImage = modal.querySelector('.modal-image');
    const modalTitle = modal.querySelector('.modal-title');
    const modalDesc = modal.querySelector('.modal-description');

    // Create transition effect
    modalImage.style.opacity = '0';
    modalImage.style.transform = direction === 'next' ? 'translateX(50px)' : 'translateX(-50px)';

    setTimeout(() => {
      // Update content
      modalImage.src = image.src;
      modalTitle.textContent = title;
      modalDesc.textContent = description;

      // Update progress indicator
      updateProgressIndicator(newIndex, allItems.length);

      // Show with animation
      setTimeout(() => {
        modalImage.style.opacity = '1';
        modalImage.style.transform = 'translateX(0)';
      }, 50);
    }, 300);

    // Create transition effect for item
    createGlitchEffect(newItem.querySelector('.gallery-image'));
    createExtraParticles(window.innerWidth/2, window.innerHeight/2, false);
  }

  // Update progress indicator
  function updateProgressIndicator(currentIndex, totalItems) {
    const progressContainer = currentModal.querySelector('.modal-progress');
    progressContainer.innerHTML = '';

    for (let i = 0; i < totalItems; i++) {
      const dot = document.createElement('span');
      dot.className = 'progress-dot' + (i === currentIndex ? ' active' : '');
      progressContainer.appendChild(dot);
    }
  }

  // Add shine effect element to gallery items
  galleryItems.forEach(item => {
    const shine = document.createElement('div');
    shine.className = 'gallery-shine';
    item.appendChild(shine);

    // Add 3D tilt effect
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate position relative to center (from -1 to 1)
      const xRatio = (x / rect.width) * 2 - 1;
      const yRatio = (y / rect.height) * 2 - 1;

      // Apply rotations (max 15 degrees)
      const maxRotation = 15;
      item.style.transform = `
        perspective(1000px) 
        rotateY(${xRatio * maxRotation}deg) 
        rotateX(${-yRatio * maxRotation}deg)
        translateZ(30px)
        scale(1.05)
      `;

      // Move light reflection effect based on mouse position
      const overlay = item.querySelector('.gallery-overlay');
      overlay.style.background = `
        linear-gradient(
          ${120 + xRatio * 30}deg,
          rgba(41, 20, 82, 0.8) 0%, 
          rgba(41, 20, 82, 0.4) 40%, 
          rgba(${255 - Math.abs(xRatio) * 50}, ${158 + yRatio * 30}, ${219 + xRatio * 30}, 0.6) 50%,
          rgba(41, 20, 82, 0.4) 60%,
          rgba(41, 20, 82, 0.8) 100%
        )
      `;

      // Create dynamic highlight effect
      const shineX = (x / rect.width) * 100;
      const shineY = (y / rect.height) * 100;
      shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)`;
      shine.style.opacity = '1';
    });

    // Reset on mouse leave
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
      const overlay = item.querySelector('.gallery-overlay');
      overlay.style.background = '';
      shine.style.opacity = '0';
    });

    // Add click effects and open modal
    item.addEventListener('click', (e) => {
      // Prevent multiple clicks
      if (item.classList.contains('clicked')) return;

      // Add clicked class for animation
      item.classList.add('clicked');
      lastClickedItem = item; // Update last clicked item

      // Get item data
      const image = item.querySelector('.gallery-image');
      const title = item.querySelector('.gallery-title')?.textContent || '';
      const description = item.querySelector('.gallery-description')?.textContent || '';

      // Get coordinates for effects
      const rect = item.getBoundingClientRect();
      const centerX = rect.left + rect.width/2;
      const centerY = rect.top + rect.height/2;

      // Create ripple effects
      createExtraParticles(centerX, centerY, true);
      createShockwave(centerX, centerY);

      // Add glitch effect to image
      if (image) {
        createGlitchEffect(image);

        // Scale up quickly
        image.style.transform = 'scale(1.3)';

        // Delayed modal opening for better effect
        setTimeout(() => {
          // Open the modal with the image data
          openModal(image.src, title, description);
          updateProgressIndicator(Array.from(document.querySelectorAll('.gallery-item')).indexOf(item), document.querySelectorAll('.gallery-item').length);

          // Reset animation class after effect completes
          setTimeout(() => {
            item.classList.remove('clicked');
            image.style.transform = '';
          }, 300);
        }, 300);
      }
    });
  });

  // Add animation for section title
  const sectionTitle = document.querySelector('.section-title');
  if (sectionTitle) {
    // Add 3D letters similar to main title
    const text = sectionTitle.textContent;
    sectionTitle.textContent = '';
    sectionTitle.setAttribute('aria-label', text);

    for (let i = 0; i < text.length; i++) {
      const letterSpan = document.createElement('span');
      letterSpan.textContent = text[i];
      letterSpan.style.cssText = `
        display: inline-block;
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        animation: sectionLetterFloat 3s ease-in-out ${i * 0.08}s infinite alternate;
        position: relative;
        text-shadow: 0 0 10px rgba(162, 57, 234, 0.3);
      `;

      // Add colored glow to each letter
      const hue = 270 + (i * 5) % 60; // Different color for each letter in the purple-pink range
      letterSpan.addEventListener('mouseover', () => {
        letterSpan.style.color = `hsl(${hue}, 100%, 75%)`;
        letterSpan.style.transform = 'scale(1.2) translateY(-15px)';
        letterSpan.style.textShadow = `0 0 15px hsla(${hue}, 100%, 70%, 0.8)`;

        // Create mini particles
        const rect = letterSpan.getBoundingClientRect();
        createLetterParticles(rect.left + rect.width/2, rect.top + rect.height/2, hue);
      });

      letterSpan.addEventListener('mouseout', () => {
        letterSpan.style.color = '';
        letterSpan.style.transform = '';
        letterSpan.style.textShadow = '';
      });

      sectionTitle.appendChild(letterSpan);
    }

    // Add animation keyframes with improved float effect
    const style = document.createElement('style');
    style.textContent = `
      @keyframes sectionLetterFloat {
        0% { transform: translateY(0) rotateZ(0deg); }
        25% { transform: translateY(-5px) rotateZ(1deg); }
        50% { transform: translateY(-12px) rotateZ(-1deg); }
        75% { transform: translateY(-8px) rotateZ(0.5deg); }
        100% { transform: translateY(-10px) rotateZ(-0.5deg); }
      }
    `;
    document.head.appendChild(style);
  }

  // Create particles for section title letters
  function createLetterParticles(x, y, hue) {
    const count = 5 + Math.floor(Math.random() * 5);

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 5 + 2;
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 40 + 10;
      const duration = Math.random() * 1 + 0.5;

      particle.style.cssText = `
        position: fixed;
        top: ${y}px;
        left: ${x}px;
        width: ${size}px;
        height: ${size}px;
        background: hsla(${hue}, 100%, 75%, 0.8);
        border-radius: 50%;
        z-index: 9999;
        pointer-events: none;
        box-shadow: 0 0 ${size * 2}px hsla(${hue}, 100%, 70%, 0.8);
        transform: translate(-50%, -50%);
        animation: letterParticle ${duration}s cubic-bezier(0.42, 0, 0.58, 1) forwards;
      `;

      document.body.appendChild(particle);

      // Create keyframes for this particle
      const style = document.createElement('style');
      style.textContent = `
        @keyframes letterParticle {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          100% { 
            transform: translate(
              calc(-50% + ${Math.cos(angle) * distance}px),
              calc(-50% + ${Math.sin(angle) * distance}px)
            ) scale(0);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);

      // Clean up
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
        if (style.parentNode) {
          style.parentNode.removeChild(style);
        }
      }, duration * 1000);
    }
  }

  // Add reflection to gallery items
  function addGalleryReflections() {
    galleryItems.forEach(item => {
      // Create a reflection div
      const reflection = document.createElement('div');
      reflection.className = 'gallery-reflection';
      reflection.style.cssText = `
        position: absolute;
        bottom: -80px;
        left: 0;
        width: 100%;
        height: 80px;
        background: linear-gradient(to bottom, rgba(41, 20, 82, 0.6), rgba(41, 20, 82, 0));
        transform: scaleY(-1);
        opacity: 0.3;
        pointer-events: none;
        transition: all 0.3s ease;
        z-index: -1;
      `;

      // Add reflection to non-gallery-container parent
      const parent = item.parentNode;
      parent.style.position = 'relative';
      parent.style.marginBottom = '40px';
      parent.appendChild(reflection);

      // Update reflection on hover
      item.addEventListener('mouseover', () => {
        reflection.style.opacity = '0.5';
        reflection.style.filter = 'blur(2px)';
      });

      item.addEventListener('mouseleave', () => {
        reflection.style.opacity = '0.3';
        reflection.style.filter = 'blur(4px)';
      });
    });
  }

  // Initialize reflections
  addGalleryReflections();
}

// Initialize on page load with enhanced animations
window.addEventListener('load', () => {
  createParticles();
  addParallaxEffect();
  buttonEffect();
  animateBackground();
  animateTitle();
  initTabSystem();
  addScrollEffects();
  addCursorTrail();
  addCardInteraction();
  enhanceParticleSystem();
  animateSurplusLogo();
  initGalleryInteractions();

  // Add animations to document
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% {
        transform: translateY(0) translateX(0);
      }
      25% {
        transform: translateY(-20px) translateX(10px);
      }
      50% {
        transform: translateY(-35px) translateX(-10px);
      }
      75% {
        transform: translateY(-20px) translateX(15px);
      }
    }

    /* Tab transitions */
    @keyframes tabIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes tabOut {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(20px); }
    }

    /* Pulse effect for tab indicator */
    @keyframes pulse-tab {
      0% { box-shadow: 0 0 0 0 rgba(189, 147, 249, 0.7); }
      70% { box-shadow: 0 0 0 10px rgba(189, 147, 249, 0); }
      100% { box-shadow: 0 0 0 0 rgba(189, 147, 249, 0); }
    }
  `;
  document.head.appendChild(style);
});