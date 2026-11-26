import { Component, inject } from '@angular/core';
import { PortfolioStore } from '../data/portfolio-store';

@Component({
  selector: 'app-site-footer',
  template: `
    <footer>
      <div class="wrap">
        <p>© {{ year }} {{ store.profile().name }}. Hecho con Angular.</p>
      </div>
    </footer>
  `,
  styles: `
    footer { border-top: 1px solid var(--line); padding-block: 2rem; color: var(--muted); font-size: .95rem; }
    p { margin: 0; }
  `,
})
export class SiteFooter {
  protected readonly store = inject(PortfolioStore);
  protected readonly year = new Date().getFullYear();
}
