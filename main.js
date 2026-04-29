// Datos de anatomía
const anatomyData = {
  'cuello': {
    tag: 'CABEZA · COLUMNA CERVICAL',
    name: 'Cabeza & cuello',
    desc: 'La región cervical concentra tensiones de postura, estrés y trabajo prolongado en pantallas. Liberar esta zona suele aliviar dolores de cabeza, mareos y rigidez.',
    conditions: ['Cervicalgia', 'Cefaleas tensionales', 'Tortícolis', 'Mareos cervicogénicos', 'Síndrome del latigazo']
  },
  'cuello-hombro': {
    tag: 'CINTURA ESCAPULAR',
    name: 'Hombros & trapecio',
    desc: 'Una de las zonas más cargadas del cuerpo moderno. Trabajamos con terapia manual, liberación miofascial y reeducación postural.',
    conditions: ['Síndrome subacromial', 'Manguito rotador', 'Hombro congelado', 'Contracturas de trapecio', 'Bursitis']
  },
  'espalda': {
    tag: 'COLUMNA TORÁCICA',
    name: 'Espalda media',
    desc: 'La columna dorsal sostiene la respiración y la postura general. Su disfunción se manifiesta como dolor entre los omóplatos, sensación de carga y rigidez al respirar profundo.',
    conditions: ['Dorsalgia', 'Dismetrías posturales', 'Cifosis dolorosa', 'Tensión interescapular', 'Dolor costal']
  },
  'brazos': {
    tag: 'EXTREMIDADES SUPERIORES',
    name: 'Brazos & codos',
    desc: 'Codo de tenista, túnel del carpo, tendinitis por uso repetitivo. Combinamos terapia manual, kinesio tape y reentrenamiento del gesto.',
    conditions: ['Epicondilitis', 'Túnel del carpo', 'Tendinitis del bíceps', 'Lesiones deportivas', 'Recuperación post-fractura']
  },
  'lumbar': {
    tag: 'COLUMNA LUMBAR · PELVIS',
    name: 'Zona lumbar',
    desc: 'La consulta más frecuente. Lumbalgia mecánica, hernias discales, ciática. Tratamos la causa, no sólo el dolor — y enseñamos cómo no volver a recaer.',
    conditions: ['Lumbalgia aguda', 'Lumbalgia crónica', 'Hernia discal', 'Ciática', 'Disfunción de sacroilíaca']
  },
  'rodillas': {
    tag: 'ARTICULACIÓN DE RODILLA',
    name: 'Rodillas',
    desc: 'Lesiones deportivas, post-operatorios de menisco o ligamento cruzado, condromalacia y artrosis. Recuperación funcional progresiva con técnica.',
    conditions: ['Lesión de menisco', 'Post-quirúrgico LCA', 'Condromalacia', 'Tendinitis rotuliana', 'Artrosis']
  },
  'pies': {
    tag: 'TOBILLO · PIE',
    name: 'Tobillos & pies',
    desc: 'Esguinces mal recuperados que dejan inestabilidad, fascitis plantar, espolón calcáneo. Trabajamos la base sobre la que todo el cuerpo se apoya.',
    conditions: ['Esguince de tobillo', 'Fascitis plantar', 'Espolón calcáneo', 'Tendinitis aquiliana', 'Inestabilidad crónica']
  }
};

// Anatomía interactiva
const bodyParts = document.querySelectorAll('.body-part');
const infoTag = document.getElementById('infoTag');
const infoArea = document.getElementById('infoArea');
const infoDesc = document.getElementById('infoDesc');
const infoConditions = document.getElementById('infoConditions');

function setAnatomyInfo(area) {
  const data = anatomyData[area];
  if (!data) return;
  infoTag.textContent = data.tag;
  infoArea.textContent = data.name;
  infoDesc.textContent = data.desc;
  infoConditions.innerHTML = data.conditions
    .map(c => `<span class="condition-chip">${c}</span>`)
    .join('');
  infoArea.style.opacity = 0;
  setTimeout(() => { infoArea.style.opacity = 1; }, 50);
}

bodyParts.forEach(part => {
  part.addEventListener('mouseenter', () => {
    bodyParts.forEach(p => p.classList.remove('active'));
    part.classList.add('active');
    setAnatomyInfo(part.dataset.area);
  });
  part.addEventListener('click', () => {
    bodyParts.forEach(p => p.classList.remove('active'));
    part.classList.add('active');
    setAnatomyInfo(part.dataset.area);
  });
});

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: .12, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// Counter animation
const counters = document.querySelectorAll('[data-count]');
const counterIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const target = parseFloat(el.dataset.count);
      const decimal = parseInt(el.dataset.decimal || 0);
      const duration = 1800;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * eased).toFixed(decimal);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target.toFixed(decimal);
      }
      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    }
  });
}, { threshold: .4 });
counters.forEach(c => counterIO.observe(c));

// Form -> WhatsApp (fixed: build plain text first, then encodeURIComponent the whole string)
document.getElementById('bookingForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const service = document.getElementById('service').value;
  const message = document.getElementById('message').value;
  const plain = `Hola Luis Fernando, quisiera agendar una cita.\n\n*Nombre:* ${name}\n*Teléfono:* ${phone}\n*Tratamiento:* ${service}${message ? '\n*Comentarios:* ' + message : ''}`;
  window.open(`https://wa.me/573046086677?text=${encodeURIComponent(plain)}`, '_blank');
});
