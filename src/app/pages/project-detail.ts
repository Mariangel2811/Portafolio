import { Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../core/seo';
import { PortfolioStore } from '../data/portfolio-store';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink],
  template: `
    <div class="wrap section">
      <p><a routerLink="/" fragment="proyectos">‹ Volver a proyectos</a></p>
      @if (project(); as p) {
        <article>
          <h1>{{ p.title }}</h1>
          <p class="lead">{{ p.summary }}</p>
          @if (p.imageUrl) {
            <img [src]="p.imageUrl" [alt]="p.imageAlt" width="640" height="400" />
          }
          <h2>Acerca del proyecto</h2>
          <p>{{ p.description }}</p>
          @if (p.technologies.length) {
            <h2>Tecnologías</h2>
            <ul class="tags">
              @for (t of p.technologies; track $index) {
                <li>{{ t }}</li>
              }
            </ul>
          }
          @if (p.demoUrl || p.repoUrl) {
            <p class="links">
              @if (p.demoUrl) {
                <a class="btn" [href]="p.demoUrl" target="_blank" rel="noopener noreferrer">Ver demostración</a>
              }
              @if (p.repoUrl) {
                <a class="btn ghost" [href]="p.repoUrl" target="_blank" rel="noopener noreferrer">Ver código</a>
              }
            </p>
          }
        </article>
      } @else {
        <h1>Proyecto no encontrado</h1>
        <p>Es posible que se haya retirado. <a routerLink="/" fragment="proyectos">Ver todos los proyectos</a>.</p>
      }
    </div>
  `,
  styles: `
    h1 { font-size: clamp(2rem, 5vw, 3.25rem); }
    h2 { font-size: 1.35rem; margin-top: 2rem; }
    img { width: 100%; max-width: 40rem; height: auto; border-radius: var(--radius); border: 1px solid var(--line); margin-block: 1.5rem; }
    .links { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 2rem; }
  `,
})
export class ProjectDetail {
  private readonly store = inject(PortfolioStore);
  private readonly seo = inject(Seo);

  /** Parámetro :id de la ruta (withComponentInputBinding). */
  readonly id = input.required<string>();
  protected readonly project = computed(() => this.store.projectById(this.id()));

  constructor() {
    effect(() => {
      const p = this.project();
      const name = this.store.profile().name;
      this.seo.set(
        p ? `${p.title} · ${name}` : `Proyecto no encontrado · ${name}`,
        p ? p.summary : 'El proyecto solicitado no existe en este portafolio.',
      );
    });
  }
}
