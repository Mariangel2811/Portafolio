import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteFooter } from './layout/site-footer';
import { SiteHeader } from './layout/site-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, SiteFooter],
  template: `
    <a class="skip" href="#contenido" (click)="focusMain($event)">Saltar al contenido</a>
    <app-site-header />
    <main id="contenido" tabindex="-1">
      <router-outlet />
    </main>
    <app-site-footer />
  `,
  styles: `
    .skip { position: absolute; left: .5rem; top: -4rem; background: var(--ink); color: #fff; padding: .5rem 1rem; border-radius: 8px; z-index: 20; }
    .skip:focus { top: .5rem; }
    main { min-height: 70vh; outline: none; }
  `,
})
export class App {
  /** Con rutas por hash, el ancla normal cambiaría la ruta: se enfoca el main a mano. */
  protected focusMain(event: Event): void {
    event.preventDefault();
    document.getElementById('contenido')?.focus();
  }
}
