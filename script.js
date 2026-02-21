/* ===== script.js ===== */

// ── Stars ──────────────────────────────────────────────
(function createStars() {
  const container = document.getElementById('stars');
  const count = 55;

  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';

    const size   = Math.random() * 5 + 2;          // 2–7 px
    const left   = Math.random() * 100;             // % across screen
    const delay  = Math.random() * 10;              // stagger start
    const dur    = Math.random() * 12 + 8;          // 8–20 s per cycle

    star.style.cssText = `
      width:  ${size}px;
      height: ${size}px;
      left:   ${left}%;
      bottom: -10px;
      animation-duration:  ${dur}s;
      animation-delay:    -${delay}s;
    `;

    container.appendChild(star);
  }
})();

// ── Envelope interaction ───────────────────────────────
const wrapper   = document.getElementById('envelopeWrapper');
const tapText   = document.getElementById('tapText');
const hintText  = document.getElementById('hintText');
let opened = false;

wrapper.addEventListener('click', handleOpen);

function handleOpen() {
  if (opened) return;
  opened = true;

  // Open the envelope
  wrapper.classList.add('open');

  // Fade out the UI text hints
  tapText.style.transition  = 'opacity 0.5s ease';
  hintText.style.transition = 'opacity 0.5s ease';
  tapText.style.opacity  = '0';
  hintText.style.opacity = '0';

  // Burst sparkles
  spawnSparkles();
}

// ── Sparkle burst ──────────────────────────────────────
function spawnSparkles() {
  const emojis = ['✨', '💖', '🌸', '⭐', '💫', '🌟', '💗'];
  const rect   = wrapper.getBoundingClientRect();
  const cx     = rect.left + rect.width  / 2;
  const cy     = rect.top  + rect.height / 2;

  for (let i = 0; i < 12; i++) {
    const el = document.createElement('div');
    el.className = 'sparkle';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const angle = (i / 12) * 2 * Math.PI + Math.random() * 0.5;
    const dist  = 60 + Math.random() * 80;
    const tx    = Math.cos(angle) * dist;
    const ty    = Math.sin(angle) * dist;

    el.style.cssText = `
      left: ${cx}px;
      top:  ${cy}px;
      --tx: ${tx}px;
      --ty: ${ty}px;
      animation-delay: ${Math.random() * 0.3}s;
      animation-duration: ${0.8 + Math.random() * 0.5}s;
    `;

    document.body.appendChild(el);

    // Clean up after animation
    el.addEventListener('animationend', () => el.remove());
  }
}
