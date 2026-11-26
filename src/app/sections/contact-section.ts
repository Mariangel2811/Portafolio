import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioStore } from '../data/portfolio-store';

@Component({
  selector: 'app-contact-section',
  imports: [RouterLink],
  template: `
    <section id="contacto" class="section" aria-labelledby="contacto-titulo">
      <div class="wrap">
        <h2 id="contacto-titulo">Contacto</h2>
        @if (links().length) {
          <p class="lead">¿Quieres colaborar o conocer más de mi trabajo? Escríbeme.</p>
          <ul class="links">
            @for (c of links(); track c.id) {
              <li>
                @if (isMail(c.url)) {
                  <a class="btn ghost" [href]="c.url">{{ c.label }}</a>
                } @else {
                  <a class="btn ghost" [href]="c.url" target="_blank" rel="noopener noreferrer">
                    {{ c.label }}<span class="visually-hidden"> (abre en otra pestaña)</span>
                  </a>
                }
              </li>
            }
          </ul>
        } @else {
          <p class="muted">Agrega tus medios de contacto en <a routerLink="/editar">Editar contenido</a>.</p>
        }
      </div>
    </section>
  `,
  styles: `
    .links { display: flex; flex-wrap: wrap; gap: .75rem; list-style: none; margin: 0; padding: 0; }
  `,
})
export class ContactSection {
  protected readonly links = inject(PortfolioStore).contact;
  protected isMail(url: string): boolean {
    return url.startsWith('mailto:');
  }
}
