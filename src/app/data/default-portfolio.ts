import { Portfolio } from './portfolio.model';

/**
 * Contenido inicial. Es la ÚNICA fuente de datos del sitio: las páginas
 * solo lo dibujan. Se puede cambiar desde /#/editar sin tocar componentes.
 */
export const DEFAULT_PORTFOLIO: Portfolio = {
  "profile": {
    "name": "Mariangel Campos",
    "headline": "Estudiante de ingeniería en computación",
    "summary": "Construyo aplicaciones web y herramientas de sistemas. Me interesan el desarrollo frontend con frameworks. Este portafolio reúne lo que he aprendido y algunos de los proyectos que he hecho en la carrera.",
    "photoUrl": "img/foto-perfil.jpg",
    "photoAlt": "Ilustración de perfil con las iniciales de la persona",
    "seoTitle": "Portafolio de ingeniería en computación",
    "seoDescription": "Portafolio de un estudiante de ingeniería en computación: perfil, habilidades, trayectoria y proyectos de desarrollo web, sistemas operativos y redes."
  },
  "skills": [
    {
      "id": "sk-web",
      "title": "Desarrollo web",
      "items": [
        "TypeScript",
        "JavaScript",
        "HTML",
        "CSS",
        "RUST"
      ]
    },
    {
      "id": "sk-sys",
      "title": "Sistemas",
      "items": [
        "Linux",
        "Hilos y concurrencia",
        "Memoria virtual"
      ]
    },
    {
      "id": "sk-net",
      "title": "Redes",
      "items": [
        "Modelo Cisco PPDIOO",
        "Planificación de redes"
      ]
    },
    {
      "id": "sk-tools",
      "title": "Herramientas",
      "items": [
        "Git",
        "Trabajo en equipo",
        "Documentación técnica"
      ]
    }
  ],
  "timeline": [
    {
      "id": "tl-edu",
      "kind": "formacion",
      "title": "Ingeniería en computación",
      "place": "Universidad",
      "period": "En curso",
      "description": "Materias de desarrollo web, manejo de frameworks, sistemas operativos, redes y seguridad e higiene industrial."
    },
    {
      "id": "tl-exp",
      "kind": "experiencia",
      "title": "Proyectos académicos",
      "place": "Trabajos de la carrera",
      "period": "2026",
      "description": "Desarrollo de aplicaciones web, herramientas de línea de comandos y componentes en JavaScript, en equipo y de forma individual."
    }
  ],
  "contact": [
    {
      "id": "ct-mail",
      "label": "Correo",
      "url": "mailto:nombre@ejemplo.com"
    }
  ],
  "projects": [
    {
      "id": "laboratorio-concurrencia",
      "title": "Laboratorio de concurrencia y memoria",
      "summary": "Aplicación de terminal para experimentar con hilos, memoria virtual, RAM y SWAP en Linux.",
      "description": "Herramienta para ejecutar experimentos de concurrencia y observar el uso de memoria virtual, RAM y SWAP. Permite aplicar límites de CPU y memoria para ver cómo reacciona el sistema.",
      "imageUrl": "img/proyecto-laboratorio.svg",
      "imageAlt": "Ilustración de una terminal con barras de uso de memoria",
      "technologies": [
        "Linux",
        "Hilos",
        "Memoria virtual",
        "TUI"
      ],
      "demoUrl": "",
      "repoUrl": ""
    },
    {
      "title": "reactivity.js",
      "summary": "Componente de reactividad de variables para evaluar ecuaciones.",
      "description": "Pequeña librería en JavaScript con valores reactivos (ref) y canales: cuando una variable cambia, las ecuaciones que dependen de ella se vuelven a evaluar.",
      "imageUrl": "img/proyecto-reactivity.svg",
      "imageAlt": "Ilustración de nodos conectados que se actualizan en cadena",
      "technologies": [
        "JavaScript"
      ],
      "demoUrl": "",
      "repoUrl": "",
      "id": "reactivity-js"
    },
    {
      "title": "Personaje de hojas",
      "summary": "Prueba de movimiento de un personaje con sprites en cuatro direcciones.",
      "description": "Prueba de juego con un personaje hecho de hojas: sprites de frente, lados y espaldas con 8 cuadros cada uno, controlado con flechas y WASD. Ademas de varios laberintos.",
      "imageUrl": "img/personaje-de-hojas.jpg",
      "imageAlt": "Ilustración de un personaje de hojas caminando",
      "technologies": [
        "JavaScript",
        "HTML",
        "Sprites",
        "CSS"
      ],
      "demoUrl": "",
      "repoUrl": "",
      "id": "personaje-de-hojas"
    },
    {
      "title": "Statium Gestor de Liga Deportiva",
      "summary": "Statium es un gestor web de ligas y torneos deportivos (fútbol, ​​básquet y vóley) que permite crear ligas, registrar equipos y jugadores, programar partidos y llevar el control de resultados.",
      "description": "A partir de los partidos jugados, calcula automáticamente tablas de posiciones o brackets de eliminación directa, rankings de goleadores/anotadores y estadísticas con gráficos. Todos los datos se guardan localmente en el navegador mediante IndexedDB, e incluye funciones para exportar e importar ligas completas en formato JSON.",
      "imageUrl": "img/statium-gestor-de-liga-deportiva.jpg",
      "imageAlt": "",
      "technologies": [
        "HTML",
        "CSS",
        "JavaScript"
      ],
      "demoUrl": "https://github.com/Mariangel2811/Statium-Gestor-de-Liga-Deportiva",
      "repoUrl": "",
      "id": "statium-gestor-de-liga-deportiva"
    }
  ]
};
