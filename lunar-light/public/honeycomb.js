// public/honeycomb.js

function initHoneycomb() {
  if (document.getElementById('honeycomb-canvas')) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'honeycomb-canvas';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  let mouse = { x: width / 2, y: height / 2, active: false };

  // HIGH-DENSITY MINIATURE HONEYCOMB CONFIGURATION
  const hexRadius = 15;
  const hexHeight = hexRadius * 2;
  const hexWidth = Math.sqrt(3) * hexRadius;
  const vertDist = hexHeight * 0.75;

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;

    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  function drawHexagon(cx, cy, radius) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - (Math.PI / 6);
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    ctx.lineWidth = 0.5;

    const cols = Math.ceil(width / hexWidth) + 2;
    const rows = Math.ceil(height / vertDist) + 2;

    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        let cx = col * hexWidth;
        let cy = row * vertDist;

        if (row % 2 !== 0) {
          cx += hexWidth / 2;
        }

        // AMBIENT BACKGROUND VISIBILITY (Keeps the rest of the screen very faint)
        let alpha = 0.02;

        if (mouse.active) {
          const dx = mouse.x - cx;
          const dy = mouse.y - cy;
          const mouseDist = Math.sqrt(dx * dx + dy * dy);

          // --- FIX: Tighter, smaller highlight radius directly around cursor ---
          if (mouseDist < 120) {
            alpha += (1 - (mouseDist / 120)) * 0.28;
          }
        }

        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        drawHexagon(cx, cy, hexRadius);
        ctx.stroke();
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

initHoneycomb();
document.addEventListener('astro:page-load', initHoneycomb);
