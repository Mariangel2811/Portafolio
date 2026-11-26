import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioStore } from '../data/portfolio-store';

@Component({
  selector: 'app-projects-section',
  imports: [RouterLink],
  template: `
    <section id="proyectos" class="section" aria-labelledby="proyectos-titulo">
      <div class="wrap">
        <h2 id="proyectos-titulo">Proyectos</h2>
        @if (projects().length === 0) {
          <p class="muted">Aún no hay proyectos. Agrega el primero en «Editar contenido».</p>
        }
        <ul class="grid">
          @for (p of projects(); track p.id) {
            <li>
              <article class="card">
                @if (p.imageUrl) {
                  <img [src]="p.imageUrl" [alt]="p.imageAlt" width="640" height="400" loading="lazy" />
                }
                <div class="body">
                  <h3>{{ p.title }}</h3>
                  <p>{{ p.summary }}</p>
                  <ul class="tags">
                    @for (t of p.technologies; track $index) {
                      <li>{{ t }}</li>
                    }
                  </ul>
                  <p class="more">
                    <a [routerLink]="['/proyectos', p.id]" [attr.aria-label]="'Ver detalle de ' + p.title">Ver detalle</a>
                  </p>
                </div>
              </article>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    .grid { display: grid; gap: 1.75rem; grid-template-columns: repeat(auto-fill, minmax(min(100%, 19rem), 1fr)); list-style: none; margin: 0; padding: 0; }
    .card { height: 100%; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); overflow: hidden; display: flex; flex-direction: column; }
    .card img { width: 100%; height: auto; aspect-ratio: 8 / 5; object-fit: cover; border-bottom: 1px solid var(--line); }
    .body { padding: 1.25rem; display: flex; flex-direction: column; flex: 1; gap: .25rem; }
    h3 { margin-bottom: .4rem; }
    .body > p { color: var(--muted); }
    .more { margin: auto 0 0; padding-top: .75rem; font-weight: 600; }
  `,
})
export class ProjectsSection {
  protected readonly projects = inject(PortfolioStore).projects;
}
