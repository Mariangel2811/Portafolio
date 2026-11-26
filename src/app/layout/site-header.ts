import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PortfolioStore } from '../data/portfolio-store';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="bar">
      <div class="wrap row">
        <a class="brand" routerLink="/" aria-label="Ir al inicio">{{ store.profile().name }}</a>
        <nav aria-label="Principal">
          <ul>
            @for (item of sections; track item.fragment) {
              <li><a routerLink="/" [fragment]="item.fragment">{{ item.label }}</a></li>
            }
            <li>
              <a class="edit" routerLink="/editar" routerLinkActive="active">Editar contenido</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  `,
  styles: `
    .bar { position: sticky; top: 0; z-index: 10; background: var(--paper); border-bottom: 1px solid var(--line); }
    .row { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: .5rem 1.5rem; padding-block: .75rem; }
    .brand { font: 700 1.15rem var(--font-display); color: var(--ink); text-decoration: none; }
    ul { display: flex; flex-wrap: wrap; gap: .25rem 1.1rem; list-style: none; margin: 0; padding: 0; }
    nav a { color: var(--ink); text-decoration: none; font-weight: 500; padding: .25rem 0; border-bottom: 2px solid transparent; }
    nav a:hover { border-color: var(--signal); }
    .edit { color: var(--accent); }
    .edit.active { border-color: var(--accent); }
  `,
})
export class SiteHeader {
  protected readonly store = inject(PortfolioStore);
  protected readonly sections = [
    { label: 'Perfil', fragment: 'perfil' },
    { label: 'Habilidades', fragment: 'habilidades' },
    { label: 'Trayectoria', fragment: 'trayectoria' },
    { label: 'Proyectos', fragment: 'proyectos' },
    { label: 'Contacto', fragment: 'contacto' },
  ];
}
