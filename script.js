const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => observer.observe(item));

const countEls = document.querySelectorAll('[data-count]');

const animateCount = (element) => {
  const finalValue = Number(element.dataset.count || 0);
  const isDecimal = finalValue % 1 !== 0;
  let start = 0;
  const duration = 1400;
  const startTime = performance.now();

  const tick = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = isDecimal ? (finalValue * eased).toFixed(1) : Math.round(finalValue * eased);
    element.textContent = isDecimal ? `${current}` : `${current}+`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      element.textContent = isDecimal ? `${finalValue.toFixed(1)}` : `${finalValue}+`;
    }
  };

  requestAnimationFrame(tick);
};

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

countEls.forEach((el) => countObserver.observe(el));

const tiltCards = document.querySelectorAll('.tilt-card');

const handleTilt = (event) => {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const rotateY = ((x / rect.width) - 0.5) * 11;
  const rotateX = (0.5 - (y / rect.height)) * 11;
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
};

const resetTilt = (event) => {
  event.currentTarget.style.transform = '';
};

tiltCards.forEach((card) => {
  card.addEventListener('mousemove', handleTilt);
  card.addEventListener('mouseleave', resetTilt);
});

const magneticButtons = document.querySelectorAll('.magnetic');

magneticButtons.forEach((button) => {
  button.addEventListener('mousemove', (event) => {
    const rect = button.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left - rect.width / 2) / 10;
    const offsetY = (event.clientY - rect.top - rect.height / 2) / 10;
    button.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = '';
  });
});

const cursorGlow = document.querySelector('.cursor-glow');

window.addEventListener('pointermove', (event) => {
  if (!cursorGlow) return;
  cursorGlow.style.transform = `translate(${event.clientX - 210}px, ${event.clientY - 210}px)`;
});

const dashboard = document.querySelector('.dashboard-shell');

window.addEventListener('pointermove', (event) => {
  if (!dashboard) return;
  const x = (event.clientX / window.innerWidth - 0.5) * 12;
  const y = (event.clientY / window.innerHeight - 0.5) * 12;
  dashboard.style.transform = `rotateX(${10 - y}deg) rotateY(${-8 + x}deg) translateY(-8px)`;
});

window.addEventListener('pointerleave', () => {
  if (!dashboard) return;
  dashboard.style.transform = 'rotateX(10deg) rotateY(-8deg) translateY(-8px)';
});

const navLinks = document.querySelectorAll('.main-nav a');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.forEach((navLink) => navLink.classList.remove('active'));
    link.classList.add('active');
  });
});
