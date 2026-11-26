import { Component, effect, inject } from '@angular/core';
import { Seo } from '../core/seo';
import { PortfolioStore } from '../data/portfolio-store';
import { ProfileHero } from '../sections/profile-hero';
import { ProjectsSection } from '../sections/projects-section';
import { SkillsSection } from '../sections/skills-section';
import { TimelineSection } from '../sections/timeline-section';

@Component({
  selector: 'app-home',
  imports: [ProfileHero, SkillsSection, TimelineSection, ProjectsSection],
  template: `<app-profile-hero />
    <app-skills-section />
    <app-timeline-section />
    <app-projects-section />`,
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
