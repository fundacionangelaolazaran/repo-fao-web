/* ================================================
   MENÚ MÓVIL — control del botón hamburguesa
   ================================================ */
const btnHamburguesa = document.getElementById('btn-hamburguesa');
const menuMovil      = document.getElementById('menu-movil');
const enlacesMovil   = menuMovil.querySelectorAll('.nav__enlace-movil');

function abrirMenu() {
  menuMovil.classList.add('abierto');
  menuMovil.setAttribute('aria-hidden', 'false');
  btnHamburguesa.classList.add('activo');
  btnHamburguesa.setAttribute('aria-expanded', 'true');
  btnHamburguesa.setAttribute('aria-label', 'Cerrar menú de navegación');
}

function cerrarMenu() {
  menuMovil.classList.remove('abierto');
  menuMovil.setAttribute('aria-hidden', 'true');
  btnHamburguesa.classList.remove('activo');
  btnHamburguesa.setAttribute('aria-expanded', 'false');
  btnHamburguesa.setAttribute('aria-label', 'Abrir menú de navegación');
}

btnHamburguesa.addEventListener('click', () => {
  const estaAbierto = menuMovil.classList.contains('abierto');
  estaAbierto ? cerrarMenu() : abrirMenu();
});

/* Cerrar al hacer clic en cualquier enlace del menú móvil */
enlacesMovil.forEach(enlace => {
  enlace.addEventListener('click', cerrarMenu);
});

/* Cerrar al presionar Escape */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menuMovil.classList.contains('abierto')) {
    cerrarMenu();
    btnHamburguesa.focus();
  }
});


/* ================================================
   HEADER — compactación al hacer scroll
   ================================================ */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('header--compacto', window.scrollY > 30);
}, { passive: true });


/* ================================================
   SECCIÓN ACTIVA — resaltar enlace del menú visible
   ================================================ */
const secciones  = document.querySelectorAll('section[id]');
const enlacesNav = document.querySelectorAll('.nav__enlace');

const observadorSecciones = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    enlacesNav.forEach(enlace => {
      enlace.classList.toggle('activo', enlace.getAttribute('href') === '#' + id);
    });
  });
}, {
  rootMargin: '-30% 0px -65% 0px',
  threshold: 0,
});

secciones.forEach(s => observadorSecciones.observe(s));


/* ================================================
   SELECTOR DE IDIOMA
   ================================================ */
const selectorIdioma = document.getElementById('selector-idioma');
const btnIdioma      = document.getElementById('btn-idioma');
const banderaActual  = document.getElementById('bandera-actual');
const codigoIdioma   = document.getElementById('codigo-idioma');
const opcionesIdioma = document.querySelectorAll('.selector-idioma__opcion');

const CONFIG_IDIOMAS = {
  es: { bandera: '🇲🇽', codigo: 'ES', ariaLabel: 'Idioma actual: Español. Clic para cambiar.' },
  en: { bandera: '🇺🇸', codigo: 'EN', ariaLabel: 'Current language: English. Click to change.' },
};

let idiomaActual = localStorage.getItem('fao-idioma') || 'es';

function aplicarIdioma(lang) {
  idiomaActual = lang;
  localStorage.setItem('fao-idioma', lang);
  document.documentElement.lang = lang;

  const cfg = CONFIG_IDIOMAS[lang];
  banderaActual.textContent = cfg.bandera;
  codigoIdioma.textContent  = cfg.codigo;
  btnIdioma.setAttribute('aria-label', cfg.ariaLabel);

  opcionesIdioma.forEach(op => {
    const activo = op.dataset.lang === lang;
    op.classList.toggle('seleccionado', activo);
    op.setAttribute('aria-selected', String(activo));
  });

  document.querySelectorAll('[data-es][data-en]').forEach(el => {
    el.textContent = el.dataset[lang];
  });

  /* Placeholders de campos del formulario */
  document.querySelectorAll('[data-ph-es][data-ph-en]').forEach(el => {
    el.placeholder = lang === 'es' ? el.dataset.phEs : el.dataset.phEn;
  });
}

/* NOTA: las traducciones al inglés son una primera versión a revisar */
function t(es, en) {
  return idiomaActual === 'en' ? en : es;
}

function abrirSelectorIdioma() {
  selectorIdioma.classList.add('abierto');
  btnIdioma.setAttribute('aria-expanded', 'true');
}

function cerrarSelectorIdioma() {
  selectorIdioma.classList.remove('abierto');
  btnIdioma.setAttribute('aria-expanded', 'false');
}

btnIdioma.addEventListener('click', e => {
  e.stopPropagation();
  selectorIdioma.classList.contains('abierto') ? cerrarSelectorIdioma() : abrirSelectorIdioma();
});

opcionesIdioma.forEach(opcion => {
  opcion.addEventListener('click', () => {
    aplicarIdioma(opcion.dataset.lang);
    cerrarSelectorIdioma();
  });
});

/* Cerrar al hacer clic fuera del selector */
document.addEventListener('click', () => cerrarSelectorIdioma());

/* Cerrar con Escape */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && selectorIdioma.classList.contains('abierto')) {
    cerrarSelectorIdioma();
    btnIdioma.focus();
  }
});

/* Aplicar idioma guardado al cargar */
aplicarIdioma(idiomaActual);


/* ================================================
   CARRUSEL DEL HERO — rotación automática de fondos
   ================================================ */
(function () {
  const reducidoMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducidoMotion) return;

  const slides = document.querySelectorAll('.hero__slide');
  if (slides.length < 2) return;

  let actual = 0;

  setInterval(() => {
    slides[actual].classList.remove('activo');
    actual = (actual + 1) % slides.length;
    slides[actual].classList.add('activo');
  }, 5000);
})();


/* ================================================
   SCROLL REVEAL — fade + slide al entrar en pantalla
   ================================================ */
(function () {
  const reducidoMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducidoMotion) return;

  document.documentElement.classList.add('js-reveal');

  const elementos = document.querySelectorAll('[data-reveal]');
  if (!elementos.length) return;

  const observador = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observador.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elementos.forEach(el => {
    const delay = parseFloat(el.dataset.delay || 0);
    el.style.transitionDelay = delay + 's';
    observador.observe(el);
  });
})();


/* ================================================
   NOTICIAS — carrusel horizontal con flechas
   ================================================ */
(function () {
  const pista   = document.getElementById('noticias-pista');
  const btnPrev = document.getElementById('noticias-prev');
  const btnNext = document.getElementById('noticias-next');

  if (!pista || !btnPrev || !btnNext) return;

  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function desplazar(direccion) {
    const paso = pista.clientWidth * 0.8;
    pista.scrollBy({ left: direccion * paso, behavior: sinMovimiento ? 'auto' : 'smooth' });
  }

  function actualizarFlechas() {
    btnPrev.disabled = pista.scrollLeft <= 1;
    btnNext.disabled = pista.scrollLeft >= pista.scrollWidth - pista.clientWidth - 1;
  }

  btnPrev.addEventListener('click', () => desplazar(-1));
  btnNext.addEventListener('click', () => desplazar(1));
  pista.addEventListener('scroll', actualizarFlechas, { passive: true });
  window.addEventListener('resize', actualizarFlechas, { passive: true });

  actualizarFlechas();
})();


/* ================================================
   DONA — toggle, chips, validación, métodos de pago y count-up
   ================================================ */
(function () {

  /* ── URLs de checkout por método — REEMPLAZAR '#' por los enlaces reales ──
     Cuando el proveedor esté integrado, sustituir cada '#' por la URL real:
     - Mercado Pago: URL de Preference (redirect a checkout.mercadopago.com)
     - Stripe: URL de Payment Link o Stripe Checkout Session
     - PayPal: URL de PayPal Checkout o botón de pago */
  const URLS_PAGO = {
    mercadopago: '#',
    stripe:      '#',
    paypal:      '#',
  };

  /* ── Toggle Única vez / Mensual ── */
  const toggleBtns = document.querySelectorAll('.dona__toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('activo'));
      btn.classList.add('activo');
    });
  });

  /* ── Referenciamos los elementos clave ── */
  const chips       = document.querySelectorAll('.dona__chip');
  const montoInput  = document.getElementById('monto-personalizado');
  const ctaTexto    = document.getElementById('cta-texto');
  const ctaBtn      = document.querySelector('.dona__btn-cta');
  const errorEl     = document.getElementById('monto-error');
  const metodoBtns  = document.querySelectorAll('.dona__pago-btn');
  const metodoGroup = document.querySelector('.dona__metodos');

  /* Estado del método seleccionado */
  let metodoSeleccionado = 'mercadopago';

  /* Convierte "1,500.50" → 1500.50 */
  function valorNumerico(str) {
    return parseFloat((str || '').replace(/,/g, '')) || 0;
  }

  /* Actualiza el href del botón CTA con la URL del método activo */
  function actualizarUrlCta() {
    if (ctaBtn) ctaBtn.href = URLS_PAGO[metodoSeleccionado] || '#';
  }

  /* Actualiza el texto del botón CTA según el monto seleccionado */
  function actualizarBtnCta() {
    if (!ctaTexto) return;
    const chipActivo  = document.querySelector('.dona__chip.activo');
    const montoCustom = montoInput ? valorNumerico(montoInput.value) : 0;

    let monto = 0;
    if (chipActivo)             monto = parseInt(chipActivo.dataset.monto, 10);
    else if (montoCustom >= 10) monto = montoCustom;

    if (monto > 0) {
      const verbo = idiomaActual === 'es' ? 'Donar' : 'Donate';
      ctaTexto.textContent = verbo + ' $' + monto.toLocaleString('es-MX');
      ctaTexto.removeAttribute('data-es');
      ctaTexto.removeAttribute('data-en');
    } else {
      ctaTexto.textContent = idiomaActual === 'es' ? 'Donar ahora' : 'Donate now';
      ctaTexto.setAttribute('data-es', 'Donar ahora');
      ctaTexto.setAttribute('data-en', 'Donate now');
    }
  }

  /* ── Selección de método de pago ── */
  function seleccionarMetodo(metodo) {
    metodoSeleccionado = metodo;
    metodoBtns.forEach(btn => {
      const activo = btn.dataset.metodo === metodo;
      btn.classList.toggle('seleccionado', activo);
      btn.setAttribute('aria-checked', String(activo));
      btn.tabIndex = activo ? 0 : -1;
    });
    actualizarUrlCta();
  }

  metodoBtns.forEach(btn => {
    btn.addEventListener('click', () => seleccionarMetodo(btn.dataset.metodo));
  });

  /* Navegación por teclado: flechas entre opciones (estándar radiogroup) */
  if (metodoGroup) {
    metodoGroup.addEventListener('keydown', e => {
      const lista = Array.from(metodoBtns);
      const idx   = lista.indexOf(document.activeElement);
      if (idx === -1) return;
      let nuevo = -1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nuevo = (idx + 1) % lista.length;
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   nuevo = (idx - 1 + lista.length) % lista.length;
      if (nuevo === -1) return;
      e.preventDefault();
      seleccionarMetodo(lista[nuevo].dataset.metodo);
      lista[nuevo].focus();
    });
  }

  /* Inicializar: Mercado Pago seleccionado y URL del CTA actualizada */
  seleccionarMetodo('mercadopago');

  /* ── Chips de monto ── */
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('activo'));
      chip.classList.add('activo');
      if (montoInput) montoInput.value = chip.dataset.monto;
      if (errorEl)    errorEl.textContent = '';
      actualizarBtnCta();
    });
  });

  /* Inicializar texto del botón con el chip activo por defecto ($200) */
  actualizarBtnCta();

  /* ── Validación del campo de cantidad personalizada ── */
  if (montoInput) {

    function mostrarError(msg) { if (errorEl) errorEl.textContent = msg; }
    function ocultarError()    { if (errorEl) errorEl.textContent = ''; }

    montoInput.addEventListener('keydown', e => {
      const permitidas = ['Backspace','Delete','Tab','Escape','Enter',
                          'ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'];
      if (permitidas.includes(e.key)) return;
      if ((e.ctrlKey || e.metaKey) && 'acvx'.includes(e.key.toLowerCase())) return;
      if (/^\d$/.test(e.key)) return;
      if (e.key === '.' && !montoInput.value.replace(/,/g, '').includes('.')) return;
      e.preventDefault();
      mostrarError(t('Solo se permiten números', 'Only numbers are allowed'));
      setTimeout(ocultarError, 1800);
    });

    montoInput.addEventListener('input', () => {
      ocultarError();
      let val = montoInput.value.replace(/,/g, '').replace(/[^\d.]/g, '');
      const partes = val.split('.');
      if (partes.length > 2) val = partes[0] + '.' + partes.slice(1).join('');
      const p2 = val.split('.');
      if (p2[1] !== undefined && p2[1].length > 2)
        val = p2[0] + '.' + p2[1].slice(0, 2);
      if ((parseFloat(val) || 0) > 1_000_000) val = '1000000';
      const [ent, dec] = val.split('.');
      const entFmt = ent ? ent.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
      montoInput.value = dec !== undefined ? entFmt + '.' + dec : entFmt;
      if (montoInput.value) chips.forEach(c => c.classList.remove('activo'));
      actualizarBtnCta();
    });

    montoInput.addEventListener('blur', () => {
      if (!montoInput.value) return;
      if (valorNumerico(montoInput.value) < 10)
        mostrarError(t('El monto mínimo es $10 MXN', 'Minimum amount is $10 MXN'));
    });

    montoInput.addEventListener('focus', ocultarError);
  }

  /* ── Count-up para las estadísticas de impacto ── */
  const cifras        = document.querySelectorAll('.dona__impacto-cifra');
  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (cifras.length && !sinMovimiento) {
    cifras.forEach(el => {
      el.dataset.target = parseInt(el.textContent.replace(/\D/g, ''), 10);
      el.textContent = '0';
    });

    const observadorCount = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el       = entry.target;
        const target   = parseInt(el.dataset.target, 10);
        const duracion = 1400;
        const inicio   = performance.now();

        function animar(ahora) {
          const t    = Math.min((ahora - inicio) / duracion, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(ease * target).toLocaleString('es-MX');
          if (t < 1) requestAnimationFrame(animar);
          else       el.textContent = target.toLocaleString('es-MX');
        }
        requestAnimationFrame(animar);
        observadorCount.unobserve(el);
      });
    }, { threshold: 0.6 });

    cifras.forEach(el => observadorCount.observe(el));
  }

})();


/* ================================================
   CONTACTO — validaciones + envío con Web3Forms
   ================================================ */
(function () {
  const form      = document.getElementById('form-contacto');
  const btnEnviar = document.getElementById('btn-enviar');
  const estado    = document.getElementById('contacto-estado');
  if (!form) return;

  /* ── Helpers de error ── */
  function mostrarError(errorId, msg) {
    const el = document.getElementById(errorId);
    if (el) el.textContent = msg;
  }
  function ocultarError(errorId) {
    const el = document.getElementById(errorId);
    if (el) el.textContent = '';
  }
  function setError(input, errorId, msg) {
    input.classList.add('campo-error');
    mostrarError(errorId, msg);
  }
  function clearError(input, errorId) {
    input.classList.remove('campo-error');
    ocultarError(errorId);
  }

  /* ── Nombre y Apellidos: solo letras, acentos, ñ y espacios ── */
  const rexLetras = /^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s'-]+$/u;

  ['nombre', 'apellidos'].forEach(id => {
    const input = document.getElementById(id);
    if (!input) return;

    input.addEventListener('input', () => {
      const filtrado = input.value.replace(/[^a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s'-]/gu, '');
      if (filtrado !== input.value) input.value = filtrado;
      if (input.value && !rexLetras.test(input.value)) {
        setError(input, `error-${id}`, t('Solo se permiten letras y espacios', 'Only letters and spaces are allowed'));
      } else {
        clearError(input, `error-${id}`);
      }
    });

    input.addEventListener('blur', () => {
      if (!input.value.trim()) {
        setError(input, `error-${id}`, t('Este campo es obligatorio', 'This field is required'));
      } else if (!rexLetras.test(input.value)) {
        setError(input, `error-${id}`, t('Solo se permiten letras y espacios', 'Only letters and spaces are allowed'));
      } else {
        clearError(input, `error-${id}`);
      }
    });

    input.addEventListener('focus', () => clearError(input, `error-${id}`));
  });

  /* ── Teléfono: solo dígitos, límite inteligente según país ── */
  const telInput = document.getElementById('telefono');
  const telWrap  = document.getElementById('tel-wrap');
  const ladaEl   = document.getElementById('lada');

  /* Devuelve el máximo de dígitos según la lada seleccionada */
  function getTelMax() {
    const val = ladaEl ? ladaEl.value : '';
    return (val === '+52' || val === '+1us') ? 10 : 15;
  }

  /* Devuelve el mínimo de dígitos válido */
  function getTelMin() {
    const val = ladaEl ? ladaEl.value : '';
    return (val === '+52' || val === '+1us') ? 10 : 7;
  }

  /* Mensaje de error apropiado para el país */
  function getTelMensajeError() {
    const val = ladaEl ? ladaEl.value : '';
    if (val === '+52' || val === '+1us') return t('El número debe tener 10 dígitos', 'The number must have 10 digits');
    return t('El número debe tener entre 7 y 15 dígitos', 'The number must have 7 to 15 digits');
  }

  if (telInput) {
    /* Bloquear letras y símbolos; también bloquear dígitos cuando se alcanza el máximo */
    telInput.addEventListener('keydown', e => {
      const permitidas = ['Backspace','Delete','Tab','Escape','Enter',
                          'ArrowLeft','ArrowRight','Home','End'];
      if (permitidas.includes(e.key)) return;
      if ((e.ctrlKey || e.metaKey) && 'acvx'.includes(e.key.toLowerCase())) return;
      if (/^\d$/.test(e.key)) {
        if (telInput.value.replace(/\D/g, '').length >= getTelMax()) { e.preventDefault(); return; }
        return;
      }
      e.preventDefault();
    });

    /* Filtrar no-dígitos y truncar si el usuario pegó más del máximo */
    telInput.addEventListener('input', () => {
      let filtrado = telInput.value.replace(/\D/g, '');
      const max = getTelMax();
      if (filtrado.length > max) filtrado = filtrado.slice(0, max);
      if (filtrado !== telInput.value) telInput.value = filtrado;
      if (!telInput.value) {
        if (telWrap) telWrap.classList.remove('campo-error');
        ocultarError('error-telefono');
      }
    });

    telInput.addEventListener('blur', () => {
      const digits = telInput.value.replace(/\D/g, '');
      if (telInput.value && (digits.length < getTelMin() || digits.length > getTelMax())) {
        if (telWrap) telWrap.classList.add('campo-error');
        mostrarError('error-telefono', getTelMensajeError());
      } else {
        if (telWrap) telWrap.classList.remove('campo-error');
        ocultarError('error-telefono');
      }
    });

    telInput.addEventListener('focus', () => {
      if (telWrap) telWrap.classList.remove('campo-error');
      ocultarError('error-telefono');
    });

    /* Si el usuario cambia de país, re-validar el número que ya está escrito */
    if (ladaEl) {
      ladaEl.addEventListener('change', () => {
        if (!telInput.value) return;
        let digits = telInput.value.replace(/\D/g, '');
        const max = getTelMax();
        if (digits.length > max) {
          digits = digits.slice(0, max);
          telInput.value = digits;
        }
        if (digits.length < getTelMin()) {
          if (telWrap) telWrap.classList.add('campo-error');
          mostrarError('error-telefono', getTelMensajeError());
        } else {
          if (telWrap) telWrap.classList.remove('campo-error');
          ocultarError('error-telefono');
        }
      });
    }
  }

  /* ── Correo electrónico ── */
  const correoInput = document.getElementById('correo');
  const rexCorreo   = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (correoInput) {
    correoInput.addEventListener('blur', () => {
      if (correoInput.value && !rexCorreo.test(correoInput.value)) {
        setError(correoInput, 'error-correo', t('Ingresa un correo válido (ejemplo: nombre@correo.com)', 'Enter a valid email (example: name@email.com)'));
      } else {
        clearError(correoInput, 'error-correo');
      }
    });

    correoInput.addEventListener('input', () => {
      if (rexCorreo.test(correoInput.value)) clearError(correoInput, 'error-correo');
    });

    correoInput.addEventListener('focus', () => clearError(correoInput, 'error-correo'));
  }

  /* ── Mensaje: contador + mínimo 10 / máximo 1000 ── */
  const mensajeInput = document.getElementById('mensaje');
  const contador     = document.getElementById('contador-mensaje');

  if (mensajeInput && contador) {
    mensajeInput.addEventListener('input', () => {
      const len = mensajeInput.value.length;
      contador.textContent = len + ' / 1000';
      if (len >= 10) clearError(mensajeInput, 'error-mensaje');
    });

    mensajeInput.addEventListener('blur', () => {
      if (mensajeInput.value && mensajeInput.value.length < 10) {
        setError(mensajeInput, 'error-mensaje', t('El mensaje debe tener al menos 10 caracteres', 'The message must be at least 10 characters'));
      }
    });

    mensajeInput.addEventListener('focus', () => clearError(mensajeInput, 'error-mensaje'));
  }

  /* ── Validación completa al intentar enviar ── */
  function validarTodo() {
    let valido = true;

    const nombre = document.getElementById('nombre');
    if (!nombre.value.trim()) {
      setError(nombre, 'error-nombre', t('Este campo es obligatorio', 'This field is required')); valido = false;
    } else if (!rexLetras.test(nombre.value)) {
      setError(nombre, 'error-nombre', t('Solo se permiten letras y espacios', 'Only letters and spaces are allowed')); valido = false;
    }

    const apellidos = document.getElementById('apellidos');
    if (!apellidos.value.trim()) {
      setError(apellidos, 'error-apellidos', t('Este campo es obligatorio', 'This field is required')); valido = false;
    } else if (!rexLetras.test(apellidos.value)) {
      setError(apellidos, 'error-apellidos', t('Solo se permiten letras y espacios', 'Only letters and spaces are allowed')); valido = false;
    }

    if (telInput && telInput.value) {
      const digits = telInput.value.replace(/\D/g, '');
      if (digits.length < getTelMin() || digits.length > getTelMax()) {
        if (telWrap) telWrap.classList.add('campo-error');
        mostrarError('error-telefono', getTelMensajeError());
        valido = false;
      }
    }

    if (correoInput) {
      if (!correoInput.value.trim()) {
        setError(correoInput, 'error-correo', t('Este campo es obligatorio', 'This field is required')); valido = false;
      } else if (!rexCorreo.test(correoInput.value)) {
        setError(correoInput, 'error-correo', t('Ingresa un correo válido (ejemplo: nombre@correo.com)', 'Enter a valid email (example: name@email.com)')); valido = false;
      }
    }

    if (mensajeInput) {
      if (!mensajeInput.value.trim()) {
        setError(mensajeInput, 'error-mensaje', t('Este campo es obligatorio', 'This field is required')); valido = false;
      } else if (mensajeInput.value.length < 10) {
        setError(mensajeInput, 'error-mensaje', t('El mensaje debe tener al menos 10 caracteres', 'The message must be at least 10 characters')); valido = false;
      }
    }

    const privacidad = document.getElementById('privacidad');
    if (privacidad && !privacidad.checked) {
      mostrarError('error-privacidad', t('Debes aceptar el aviso de privacidad para enviar', 'You must accept the privacy notice to send'));
      valido = false;
    } else {
      ocultarError('error-privacidad');
    }

    return valido;
  }

  /* ── Envío del formulario ── */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validarTodo()) return;

    btnEnviar.disabled    = true;
    btnEnviar.textContent = t('Enviando…', 'Sending…');
    estado.className      = 'contacto__estado';
    estado.textContent    = '';

    const replytoInput = form.querySelector('[name="replyto"]');
    if (replytoInput && correoInput) replytoInput.value = correoInput.value;

    try {
      const resp = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const resultado = await resp.json();

      if (resultado.success) {
        estado.classList.add('exito');
        estado.textContent = t('✓ ¡Gracias! Tu mensaje fue enviado. Te responderemos pronto.', '✓ Thank you! Your message was sent. We will get back to you soon.');
        form.reset();
        if (contador) contador.textContent = '0 / 1000';
        form.querySelectorAll('input, textarea')
            .forEach(el => el.classList.remove('campo-error'));
        if (telWrap) telWrap.classList.remove('campo-error');
      } else {
        throw new Error(resultado.message || 'Error desconocido');
      }
    } catch {
      estado.classList.add('error');
      estado.textContent = t('✗ Ocurrió un error. Por favor intenta de nuevo o escríbenos directamente.', '✗ An error occurred. Please try again or contact us directly.');
    } finally {
      btnEnviar.disabled    = false;
      btnEnviar.textContent = t('Enviar mensaje', 'Send message');
    }
  });
})();
