/*  Hackitise Labs — Advanced Global Intelligence & Defense  */

/* ───────────────────── 1. SCROLL REVEAL (STAGGERED) ───────────────────── */
const revealElements = () => {
  const els = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => entry.target.classList.add('revealed'), parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

  els.forEach((el) => {
    // Automatic staggered delay for grid items
    if (el.closest('.grid-2, .grid-3, .grid-4')) {
      const idx = Array.from(el.parentElement.children).indexOf(el);
      el.dataset.delay = idx * 100;
    }
    observer.observe(el);
  });
};

/* ───────────────────── 2. ANIMATED COUNTERS ───────────────────── */
const animateCounters = () => {
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const isDecimal = el.dataset.target.includes('.');
        let count = 0;
        const duration = 2500;
        const frames = 60;
        const step = target / (duration / 1000 * frames);

        const update = () => {
          count += step;
          if (count < target) {
            el.textContent = isDecimal ? count.toFixed(1) + suffix : Math.floor(count).toLocaleString() + suffix;
            requestAnimationFrame(update);
          } else {
            el.textContent = isDecimal ? target.toFixed(1) + suffix : target.toLocaleString() + suffix;
          }
        };
        update();
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
};

/* ───────────────────── 3. PARTICLE CANVAS (STRENGTHENED) ───────────────────── */
const initParticles = () => {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles, mouse = { x: -1000, y: -1000 };

  const resize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  const createParticles = () => {
    particles = [];
    const count = Math.min(Math.floor((w * h) / 10000), 120);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1,
      });
    }
  };

  const animate = () => {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(59, 130, 246, 0.4)';
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      const mDist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
      if (mDist < 200) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.3 * (1 - mDist / 200)})`;
        ctx.lineWidth = 1.2;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    });
    requestAnimationFrame(animate);
  };

  window.addEventListener('resize', () => { resize(); createParticles(); });
  resize();
  createParticles();
  animate();
};

/* ───────────────────── 4. TYPING EFFECT (SMOOTHER) ───────────────────── */
const initTyping = () => {
  const el = document.querySelector('.hero-typing');
  if (!el) return;
  const phrases = ['Global Intelligence', 'Red Team Operations', 'Zero-Day Defense', 'Advanced DFIR', 'Critical Infrastructure'];
  let pIdx = 0, cIdx = 0, isDeleting = false;

  const tick = () => {
    const full = phrases[pIdx];
    el.textContent = full.substring(0, isDeleting ? cIdx-- : cIdx++);
    
    let speed = isDeleting ? 40 : 80;
    if (!isDeleting && cIdx > full.length) {
      speed = 2500;
      isDeleting = true;
    } else if (isDeleting && cIdx < 0) {
      isDeleting = false;
      pIdx = (pIdx + 1) % phrases.length;
      cIdx = 0;
      speed = 500;
    }
    setTimeout(tick, speed);
  };
  tick();
};

/* ───────────────────── 5. MOUSE PARALLAX (HERO) ───────────────────── */
const initParallax = () => {
  const card = document.querySelector('.intercept-card');
  if (!card) return;
  window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const x = (clientX - window.innerWidth / 2) / 40;
    const y = (clientY - window.innerHeight / 2) / 40;
    card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
  });
};

/* ───────────────────── 6. BACKEND: CONTACT FORM ───────────────────── */
const initContactForm = () => {
  const form = document.getElementById('main-contact-form');
  const feedback = document.getElementById('form-feedback');
  const btn = form?.querySelector('.btn-submit');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // UI state: Loading
    btn.classList.add('btn-loading');
    feedback.className = 'feedback-hidden';

    try {
      const response = await fetch('http://localhost:4000/api/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      btn.classList.remove('btn-loading');

      if (result.success) {
        feedback.textContent = 'Message neutralized. Our defense team will reach out within 24 hours.';
        feedback.className = 'feedback-success';
        form.reset();
      } else {
        throw new Error(result.error || 'Transmission failed.');
      }
    } catch (err) {
      btn.classList.remove('btn-loading');
      feedback.textContent = 'Breach in transmission: ' + err.message;
      feedback.className = 'feedback-error';
    }
  });
};

/* ───────────────────── 7. DYNAMIC OVERLAYS ───────────────────── */
const addDynamicOverlays = () => {
  const body = document.body;
  
  // Scan line
  const scan = document.createElement('div');
  scan.className = 'cyber-scan-line';
  body.appendChild(scan);

  // WhatsApp
  const wa = document.createElement('a');
  wa.href = 'https://wa.me/919876543210';
  wa.target = '_blank';
  wa.className = 'btn-whatsapp-float';
  wa.innerHTML = '💬';
  wa.setAttribute('title', 'Chat with Defense Team');
  body.appendChild(wa);
};

/* ───────────────────── 8. RADAR/INTERCEPT LOGS (POLISHED) ─────────────────── */
const initRadarLogs = () => {
  const container = document.getElementById('radar-log-lines');
  if (!container) return;

  const logTemplates = [
    { type: 'sys', lbl: 'SYS', msg: 'Core systems synchronized.' },
    { type: 'wrn', lbl: 'WRN', msg: 'Zero-day pattern detected from 104.28.14.9' },
    { type: 'crt', lbl: 'CRT', msg: 'Automated response protocol: AX7 initiated.' },
    { type: 'sys', lbl: 'SYS', msg: 'Encrypted tunnel established. AES-256.' },
    { type: 'wrn', lbl: 'WRN', msg: 'Unauthorized root attempt at NODE: HX-992' },
    { type: 'crt', lbl: 'CRT', msg: 'Host isolated. Threat neutralized.' },
    { type: 'sys', lbl: 'SYS', msg: 'Scanning for lateral movement... 0 matches.' },
    { type: 'crt', lbl: 'CRT', msg: 'PII leak prevented. Data masked.' }
  ];

  let lIdx = 0;
  const pushLog = () => {
    const t = logTemplates[lIdx % logTemplates.length];
    const line = document.createElement('div');
    line.className = 'radar-log-line';
    line.innerHTML = `<span class="log-time">[${new Date().toLocaleTimeString('en-GB')}]</span> <span class="log-type-${t.type}">${t.lbl}</span> <span>${t.msg}</span>`;
    container.appendChild(line);
    if (container.children.length > 5) container.removeChild(container.firstChild);
    lIdx++;
  };
  pushLog();
  setInterval(pushLog, 4000);
};

/* ───────────────────── 9. NAVBAR POLISH ───────────────────── */
const initNavbar = () => {
  const nav = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('navbar-scrolled', window.scrollY > 40);
  });
};

/* ───────────────────── INITIALIZE ───────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  revealElements();
  animateCounters();
  initTyping();
  initParallax();
  initContactForm();
  addDynamicOverlays();
  initRadarLogs();
  initNavbar();
});
