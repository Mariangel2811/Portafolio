# Portafolio editable (Angular)

Portafolio web con perfil, habilidades, trayectoria, proyectos y contacto. Todo el contenido sale de **un solo lugar** (`PortfolioStore`) y se edita desde la propia aplicación, sin tocar el código de las páginas.

## Requisitos de la actividad

| Requisito | Dónde está |
|---|---|
| Presentación profesional | `sections/profile-hero.ts` |
| Habilidades y trayectoria | `sections/skills-section.ts`, `sections/timeline-section.ts` |
| Listado e información de cada proyecto | `sections/projects-section.ts`, `pages/project-detail.ts` |
| Contacto con enlaces funcionales | `sections/contact-section.ts` |
| Contenido editable y gestión de proyectos | `pages/editor.ts` + `editor/*` (ruta `/#/editar`) |
| Cambios sin rediseñar | las vistas solo leen señales de `data/portfolio-store.ts` |
| Navegación clara | cabecera con anclas, detalle con «Volver», proyecto inexistente controlado |
| Diseño adaptable | CSS con grid/clamp, probado en 390 px y 1280 px |
| Accesibilidad | salto al contenido, foco visible, etiquetas en formularios, `alt` editable, avisos con `role="status"`, `prefers-reduced-motion` |
| Buscadores | título y descripción por página (`core/seo.ts`), `lang="es"`, título y descripción SEO editables |

## Cómo se guarda el contenido

- Contenido inicial: `src/app/data/default-portfolio.ts`.
- Los cambios hechos en «Editar contenido» se guardan en `localStorage` de **tu navegador**.
- En la pestaña **Respaldo** puedes descargar/importar un JSON. Para que el sitio publicado muestre tu contenido a todos, pasa ese contenido a `default-portfolio.ts` y vuelve a desplegar.

## Primeros pasos

1. Abre `/#/editar` y reemplaza nombre, descripción, foto, correo y enlaces de cada proyecto (demostración y código son opcionales: si están vacíos no se muestran).
2. Pasa lo editado a `default-portfolio.ts` antes de desplegar.

## Desarrollo

```bash
npm install
npm start          # http://localhost:4200
npm test           # pruebas del store (Vitest)
npm run build      # dist/portafolio/browser
```

## Despliegue

Las rutas usan `#`, así que funciona en cualquier hosting estático sin reglas de reescritura.

- **GitHub Pages**: en *Settings → Pages* elige *GitHub Actions*. `.github/workflows/deploy.yml` prueba, compila y publica en cada push a `main`.
- **Netlify / Vercel / otro**: comando `npm run build`, carpeta `dist/portafolio/browser`.

## Estructura

```
src/app
├── core/       seo, ids, procesamiento de imágenes
├── data/       modelo, contenido inicial y store (única fuente de datos)
├── layout/     cabecera y pie
├── sections/   bloques de la página de inicio
├── pages/      inicio, detalle de proyecto, editor
└── editor/     formularios de edición y respaldo
```
