import { Portfolio } from './portfolio.model';

/**
 * Contenido inicial. Es la ÚNICA fuente de datos del sitio: las páginas
 * solo lo dibujan. Se puede cambiar desde /#/editar sin tocar componentes.
 */
export const DEFAULT_PORTFOLIO: Portfolio = {
  profile: {
    name: 'Tu Nombre Apellido',
    headline: 'Estudiante de ingeniería en computación',
    summary:
      'Construyo aplicaciones web y herramientas de sistemas. Me interesan el desarrollo frontend con frameworks, los sistemas operativos y las redes. Este portafolio reúne lo que he aprendido y los proyectos que he hecho en la carrera.',
    photoUrl: 'img/avatar.svg',
    photoAlt: 'Ilustración de perfil con las iniciales de la persona',
    seoTitle: 'Portafolio de ingeniería en computación',
    seoDescription:
      'Portafolio de un estudiante de ingeniería en computación: perfil, habilidades, trayectoria y proyectos de desarrollo web, sistemas operativos y redes.',
  },
  skills: [
    {
      id: 'sk-web',
      title: 'Desarrollo web',
      items: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
    },
    {
      id: 'sk-sys',
      title: 'Sistemas',
      items: ['Linux', 'Hilos y concurrencia', 'Memoria virtual', 'Terminal (TUI)'],
    },
    {
      id: 'sk-net',
      title: 'Redes',
      items: ['Modelo Cisco PPDIOO', 'Planificación de redes'],
    },
    {
      id: 'sk-tools',
      title: 'Herramientas',
      items: ['Git', 'Trabajo en equipo', 'Documentación técnica'],
    },
  ],
  timeline: [
    {
      id: 'tl-edu',
      kind: 'formacion',
      title: 'Ingeniería en computación',
      place: 'Universidad',
      period: 'En curso',
      description:
        'Materias de desarrollo web, manejo de frameworks, sistemas operativos, redes y seguridad e higiene industrial.',
    },
    {
      id: 'tl-exp',
      kind: 'experiencia',
      title: 'Proyectos académicos',
      place: 'Trabajos de la carrera',
      period: '2026',
      description:
        'Desarrollo de aplicaciones web, herramientas de línea de comandos y componentes en JavaScript, en equipo y de forma individual.',
    },
  ],
  contact: [
    { id: 'ct-mail', label: 'Correo', url: 'mailto:nombre@ejemplo.com' },
  ],
  projects: [
    {
      id: 'laboratorio-concurrencia',
      title: 'Laboratorio de concurrencia y memoria',
      summary:
        'Aplicación de terminal para experimentar con hilos, memoria virtual, RAM y SWAP en Linux.',
      description:
        'Herramienta para ejecutar experimentos de concurrencia y observar el uso de memoria virtual, RAM y SWAP. Permite aplicar límites de CPU y memoria para ver cómo reacciona el sistema.',
      imageUrl: 'img/proyecto-laboratorio.svg',
      imageAlt: 'Ilustración de una terminal con barras de uso de memoria',
      technologies: ['Linux', 'Hilos', 'Memoria virtual', 'TUI'],
      demoUrl: '',
      repoUrl: '',
    },
    {
      id: 'tienda-en-linea',
      title: 'Tienda en línea (frontend)',
      summary: 'Interfaz de e-commerce con catálogo, carrito y buenas prácticas de colaboración.',
      description:
        'Proyecto final de Manejo de Frameworks: catálogo de productos, carrito de compras y documentación con README y guía de contribución.',
      imageUrl: 'img/proyecto-tienda.svg',
      imageAlt: 'Ilustración de una tienda con tarjetas de producto',
      technologies: ['Frontend', 'HTML', 'CSS', 'Git'],
      demoUrl: '',
      repoUrl: '',
    },
    {
      id: 'reactivity-js',
      title: 'reactivity.js',
      summary: 'Componente de reactividad de variables para evaluar ecuaciones.',
      description:
        'Pequeña librería en JavaScript con valores reactivos (ref) y canales: cuando una variable cambia, las ecuaciones que dependen de ella se vuelven a evaluar.',
      imageUrl: 'img/proyecto-reactivity.svg',
      imageAlt: 'Ilustración de nodos conectados que se actualizan en cadena',
      technologies: ['JavaScript'],
      demoUrl: '',
      repoUrl: '',
    },
    {
      id: 'personaje-de-hojas',
      title: 'Personaje de hojas',
      summary: 'Prueba de movimiento de un personaje con sprites en cuatro direcciones.',
      description:
        'Prueba de juego con un personaje hecho de hojas: sprites de frente, lados y espaldas con 8 cuadros cada uno, controlado con flechas y WASD.',
      imageUrl: 'img/proyecto-personaje.svg',
      imageAlt: 'Ilustración de un personaje de hojas caminando',
      technologies: ['JavaScript', 'HTML', 'Sprites'],
      demoUrl: '',
      repoUrl: '',
    },
  ],
};
