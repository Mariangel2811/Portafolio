import { Component, inject } from '@angular/core';
import { PortfolioStore } from '../data/portfolio-store';

@Component({
  selector: 'app-timeline-section',
  template: `
    <section id="trayectoria" class="section" aria-labelledby="trayectoria-titulo">
      <div class="wrap">
        <h2 id="trayectoria-titulo">Trayectoria</h2>
        <div class="cols">
          <div>
            <h3>Formación</h3>
            @for (e of education(); track e.id) {
              <article>
                <h4>{{ e.title }}</h4>
                <p class="meta">{{ e.place }} · {{ e.period }}</p>
                <p>{{ e.description }}</p>
              </article>
            } @empty {
              <p class="muted">Sin formación registrada.</p>
            }
          </div>
          <div>
            <h3>Experiencia</h3>
            @for (e of experience(); track e.id) {
              <article>
                <h4>{{ e.title }}</h4>
                <p class="meta">{{ e.place }} · {{ e.period }}</p>
                <p>{{ e.description }}</p>
              </article>
            } @empty {
              <p class="muted">Sin experiencia registrada.</p>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .cols { display: grid; gap: 2.5rem 4rem; grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr)); }
    article { border-left: 4px solid var(--signal); padding-left: 1rem; margin-bottom: 1.75rem; }
    h4 { font: 600 1.15rem var(--font-display); margin: 0 0 .2rem; }
    .meta { color: var(--muted); font-size: .95rem; margin-bottom: .5rem; }
  `,
})
export class TimelineSection {
  private readonly store = inject(PortfolioStore);
  protected readonly education = this.store.education;
  protected readonly experience = this.store.experience;
}
