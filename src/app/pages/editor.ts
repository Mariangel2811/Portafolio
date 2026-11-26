import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../core/seo';
import { SkillsEditor } from '../editor/skills-editor';
import { TimelineEditor } from '../editor/timeline-editor';
import { ContactEditor } from '../editor/contact-editor';
import { ProfileEditor } from '../editor/profile-editor';

const TABS = [
  { id: 'perfil', label: 'Presentación' },
  { id: 'contacto', label: 'Contacto' },
  { id: 'trayectoria', label: 'Trayectoria' },
  { id: 'habilidades', label: 'Habilidades' },
] as const;

type Tab = (typeof TABS)[number]['id'];

@Component({
  selector: 'app-editor',
  imports: [RouterLink, ProfileEditor, ContactEditor, TimelineEditor, SkillsEditor],
  template: `
    <div class="wrap section">
      <h1>Editar contenido</h1>
      <p class="lead">Los cambios se guardan en este navegador y se ven al instante en el sitio.</p>
      <p><a routerLink="/">‹ Ver el sitio</a></p>
      <nav aria-label="Secciones del editor" class="tabs">
        @for (t of tabs; track t.id) {
          <button type="button" class="btn small" [class.ghost]="tab() !== t.id"
            [attr.aria-current]="tab() === t.id ? 'page' : null" (click)="tab.set(t.id)">{{ t.label }}</button>
        }
      </nav>
      @switch (tab()) {
        @case ('perfil') { <app-profile-editor /> }
        @case ('contacto') { <app-contact-editor /> }
        @case ('trayectoria') { <app-timeline-editor /> }
        @case ('habilidades') { <app-skills-editor /> }
      }
    </div>
  `,
  styles: `
    h1 { font-size: clamp(2rem, 5vw, 3rem); }
    .tabs { display: flex; flex-wrap: wrap; gap: .5rem; margin-block: 1.5rem; }
  `,
})
export class Editor {
  protected readonly tabs = TABS;
  protected readonly tab = signal<Tab>('perfil');

  constructor() {
    inject(Seo).set('Editar contenido · Portafolio', 'Edición del contenido del portafolio.');
  }
}
