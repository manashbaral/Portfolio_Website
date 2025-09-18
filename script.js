var typed = new Typed('#element', {
      strings: ['Electronics','Machine Learning','Artificial Intelligence', 'Tech Enthusiast'],
      typeSpeed: 60,
      backSpeed: 30,
      loop: true
    });
    
// Hamburger menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('nav .right');
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section, footer');
const navLinks = document.querySelectorAll('nav ul li a');

function activateNavLink() {
  let scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    if (section.id && section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === section.id) {
          link.classList.add('active');
        }
      });
    }
  });
}
window.addEventListener('scroll', activateNavLink);
window.addEventListener('DOMContentLoaded', activateNavLink);

// Close menu on link click (mobile)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

(function() {
  const canvas = document.getElementById('circuit-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, dpr;
  function resize() {
    dpr = window.devicePixelRatio || 1;
    w = canvas.offsetWidth;
    h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }
  resize();
  window.addEventListener('resize', resize);

  // Generate random circuit nodes
  const NODES = 18;
  let nodes = [];
  function randomNodes() {
    nodes = [];
    for (let i = 0; i < NODES; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 2 + Math.random() * 2,
        dx: (Math.random() - 0.5) * 0.2,
        dy: (Math.random() - 0.5) * 0.2
      });
    }
  }
  randomNodes();

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Draw lines
    ctx.save();
    ctx.globalAlpha = 0.45;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        let a = nodes[i], b = nodes[j];
        let dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 180) {
          ctx.strokeStyle = dist < 80 ? "#ffcc00" : "#148EB4";
          ctx.lineWidth = dist < 80 ? 1.5 : 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    ctx.restore();

    // Draw nodes
    for (let node of nodes) {
      ctx.save();
      ctx.shadowColor = "#ffcc00";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r + 1, 0, 2 * Math.PI);
      ctx.fillStyle = "#ffcc00";
      ctx.fill();
      ctx.restore();

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, 2 * Math.PI);
      ctx.fillStyle = "#148EB4";
      ctx.fill();
    }
  }

  function animate() {
    for (let node of nodes) {
      node.x += node.dx;
      node.y += node.dy;
      // Bounce at edges
      if (node.x < 0 || node.x > w) node.dx *= -1;
      if (node.y < 0 || node.y > h) node.dy *= -1;
    }
    draw();
    requestAnimationFrame(animate);
  }

  // Re-generate nodes on resize for responsiveness
  window.addEventListener('resize', () => {
    setTimeout(() => {
      randomNodes();
    }, 200);
  });

  animate();
})();

 const vid = document.getElementById('video');
  vid.muted = true;  // mutes the video
  // vid.muted = false; // unmutes the video