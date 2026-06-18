# CLAUDE.md — Fundación Ángela Olazarán (sitio web)

Este archivo le da contexto a Claude Code sobre el proyecto. Léelo siempre antes de generar o editar código.

## Qué es este proyecto

Sitio web oficial de la **Fundación Ángela Olazarán (FAO)**, una organización mexicana enfocada en **educación STEM, liderazgo juvenil y acceso a oportunidades** para juventudes de comunidades con menos acceso en México.

- Dominio: `fundacionangelaolazaran.org`
- Función principal del sitio: **recibir donaciones** + presentar la misión de la fundación.
- Audiencia: donantes nacionales (México) e internacionales, aliados, prensa y jóvenes.
- Tráfico esperado: bajo (menos de 10,000 visitas al mes).
- Administrador del sitio: Quique Olazarán (programador Python, no experto en frontend).

## Objetivo de esta versión (V1)

Una página de **una sola pantalla con scroll** (one-page), con estas secciones en orden:

1. **Inicio (Hero)** — imagen a pantalla completa con capa oscura, titular grande en mayúsculas, subtítulo y botones de acción.
2. **Quiénes Somos** — misión y visión de la fundación.
3. **Programas** — las líneas de acción (talleres STEM, clubes comunitarios, donación de kits, eventos de liderazgo).
4. **Participa** — llamado a donar y a involucrarse.
5. **Contacto** — formulario de contacto + redes sociales.

Incluye también:
- Un **Header** fijo arriba: logo a la izquierda, menú de navegación, y un botón "Donar" destacado.
- Donaciones en **modo demo** por ahora (botones que luego enlazarán a Mercado Pago / Stripe). NO hay pagos reales todavía.

## Stack y reglas técnicas

- **Lenguajes:** HTML, CSS y JavaScript puro (vanilla). NO usar React, Next.js, ni frameworks. El administrador entiende mejor HTML/CSS simple.
- **Archivos:** mantener el código limpio, ordenado y comentado en español, fácil de editar a mano en VS Code.
- **Responsive:** diseño mobile-first, debe verse bien en celular y computadora.
- **Accesibilidad:** foco visible en navegación por teclado, buen contraste, respetar `prefers-reduced-motion`.
- **Sin cookies de rastreo** (no requiere banner de consentimiento).
- **Hosting destino:** Cloudflare Pages (sitio estático). No usar backend en esta versión.

## Identidad visual

### Estilo de referencia
Inspirarse en el sitio de Silicon Valley Education Foundation (svefoundation.org): header blanco limpio, botón "Donar" sólido y llamativo, Hero con foto real a pantalla completa, titular **grande, condensado y en MAYÚSCULAS** alineado a la izquierda. Diseño profesional, con intención, NO genérico.

### Tipografía
- Titulares: fuente condensada y fuerte, tipo **Oswald** (o Anton / Archivo Black), en mayúsculas.
- Texto de cuerpo: una sans-serif limpia y legible, tipo **Inter**.
- Cargar las fuentes desde Google Fonts.

### Paleta de colores (EXACTA — definir como variables CSS y usar SOLO estas, nunca colores con nombre del framework)

```css
:root {
  --cinabrio:      #E13F33;  /* rojo — botón Donar / acciones principales */
  --naranja-llama: #EE7404;  /* naranja — acentos y detalles */
  --buff:          #F0E084;  /* amarillo suave — fondos de secciones alternas */
  --azul-real:     #4559E0;  /* azul — títulos y encabezados */
  --pampas:        #F3EFEA;  /* casi blanco — fondo base del sitio */
}
```

Roles sugeridos:
- Fondo principal: `--pampas`
- Títulos/encabezados: `--azul-real`
- Botón "Donar" y llamados de acción: `--cinabrio`
- Acentos y detalles: `--naranja-llama`
- Fondos de secciones alternas: `--buff`

## Contenido de referencia (editable por el administrador)

### Misión
Acercar oportunidades educativas, tecnológicas y de liderazgo a juventudes de comunidades con menos acceso en México, conectando la ciencia con las personas y formando agentes de cambio con conciencia social, empatía y visión global.

### Visión
Ser una organización referente en América Latina en la formación de juventudes líderes en STEM y acción social.

### Programas (líneas de acción)
1. Talleres y jornadas STEM en escuelas.
2. Clubes y laboratorios comunitarios.
3. Donación y gestión de kits educativos.
4. Eventos nacionales de juventud y liderazgo.

### Hero (textos base — el administrador los reemplazará)
- Título: "Impulsamos el talento STEM de jóvenes en comunidades con menos acceso"
- Subtítulo: "Acercamos educación, tecnología y liderazgo a juventudes de México, formando agentes de cambio con visión global."
- Botones: "Dona ahora" (principal) y "Conócenos" (secundario).

## Cómo trabajar en este proyecto

- Construir sección por sección, empezando por **Header + Hero**.
- Después de cada sección, dejar el código listo para revisar en el navegador.
- Las imágenes del Hero y secciones las pondrá el administrador en una carpeta `img/`.
- Preguntar antes de agregar dependencias o herramientas nuevas: la prioridad es simplicidad y que el administrador pueda mantenerlo solo.
