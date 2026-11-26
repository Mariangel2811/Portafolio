import { Component, effect, inject } from '@angular/core';
import { Seo } from '../core/seo';
import { PortfolioStore } from '../data/portfolio-store';
import { ProfileHero } from '../sections/profile-hero';

@Component({
  selector: 'app-home',
  imports: [ProfileHero],
  template: `<app-profile-hero />`,
})
export class Home {
  private readonly store = inject(PortfolioStore);
  private readonly seo = inject(Seo);

  constructor() {
    effect(() => {
      const p = this.store.profile();
      this.seo.set(`${p.name} · ${p.seoTitle}`, p.seoDescription);
    });
  }
}
