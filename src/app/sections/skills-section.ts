import { Component, inject } from '@angular/core';
import { PortfolioStore } from '../data/portfolio-store';

@Component({
  selector: 'app-skills-section',
  template: `
    <section id="habilidades" class="section" aria-labelledby="habilidades-titulo">
      <div class="wrap">
        <h2 id="habilidades-titulo">Habilidades</h2>
        @if (skills().length === 0) {
          <p class="muted">Aún no hay habilidades. Agrégalas en «Editar contenido».</p>
        }
        <div class="groups">
          @for (group of skills(); track group.id) {
            <div class="group">
              <h3>{{ group.title }}</h3>
              <ul class="tags">
                @for (item of group.items; track $index) {
                  <li>{{ item }}</li>
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .groups { display: grid; gap: 2rem 3rem; grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); }
    h3 { margin-bottom: .75rem; }
  `,
})
export class SkillsSection {
  protected readonly skills = inject(PortfolioStore).skills;
}
