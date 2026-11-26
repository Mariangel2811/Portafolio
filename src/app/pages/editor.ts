import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../core/seo';
import { ProfileEditor } from '../editor/profile-editor';

type Tab = 'perfil';

@Component({
  selector: 'app-editor',
  imports: [RouterLink, ProfileEditor],
  template: `
    <div class="wrap section">
      <h1>Editar contenido</h1>
      <p class="lead">Los cambios se guardan en este navegador y se ven al instante en el sitio.</p>
      <p><a routerLink="/">‹ Ver el sitio</a></p>
      <nav aria-label="Secciones del editor" class="tabs">
        <button type="button" class="btn small" [class.ghost]="tab() !== 'perfil'" [attr.aria-current]="tab() === 'perfil' ? 'page' : null" (click)="tab.set('perfil')">Presentación</button>
      </nav>
      @if (tab() === 'perfil') { <app-profile-editor /> }
    </div>
  `,
  styles: `
    h1 { font-size: clamp(2rem, 5vw, 3rem); }
    .tabs { display: flex; flex-wrap: wrap; gap: .5rem; margin-block: 1.5rem; }
  `,
})
export class Editor {
  protected readonly tab = signal<Tab>('perfil');

  constructor() {
    inject(Seo).set('Editar contenido · Portafolio', 'Edición del contenido del portafolio.');
  }
}
