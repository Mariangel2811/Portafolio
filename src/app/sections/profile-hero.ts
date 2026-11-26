import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioStore } from '../data/portfolio-store';

@Component({
  selector: 'app-profile-hero',
  imports: [RouterLink],
  template: `
    <section id="perfil" class="section" aria-labelledby="perfil-titulo">
      <div class="wrap hero">
        <div class="text">
          <p class="headline">{{ p().headline }}</p>
          <h1 id="perfil-titulo">{{ p().name }}</h1>
          <p class="lead">{{ p().summary }}</p>
          <p class="actions">
            <a class="btn" routerLink="/" fragment="proyectos">Ver proyectos</a>
            <a class="btn ghost" routerLink="/" fragment="contacto">Contactar</a>
          </p>
        </div>
        <div class="photo">
          <img [src]="p().photoUrl" [alt]="p().photoAlt" width="400" height="400" />
        </div>
      </div>
    </section>
  `,
  styles: `
    .hero { display: grid; gap: 2.5rem; align-items: center; }
    .headline { font: 600 1.05rem var(--font-body); color: var(--accent); margin-bottom: .75rem; }
    h1 { overflow-wrap: anywhere; }
    .actions { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 1.75rem; }
    .photo { justify-self: start; }
    .photo img {
      width: min(16rem, 70vw); height: auto; aspect-ratio: 1; object-fit: cover;
      border-radius: 50%; border: 6px solid var(--signal); box-shadow: 14px 14px 0 var(--accent-soft);
    }
    @media (min-width: 52rem) {
      .hero { grid-template-columns: 1fr auto; gap: 4rem; }
      .photo { justify-self: end; }
      .photo img { width: 20rem; }
    }
  `,
})
export class ProfileHero {
  protected readonly p = inject(PortfolioStore).profile;
}
