import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { newId } from '../core/ids';
import { PortfolioStore } from '../data/portfolio-store';
import { ContactLink } from '../data/portfolio.model';

const VALID = /^(https?:\/\/|mailto:)\S+$/i;

@Component({
  selector: 'app-contact-editor',
  imports: [FormsModule],
  template: `
    <form class="panel" (ngSubmit)="save()">
      <h2>Medios de contacto</h2>
      @for (c of draft; track c.id; let i = $index) {
        <div class="two panel">
          <div class="field">
            <label [for]="'ct-l-' + c.id">Nombre</label>
            <input [id]="'ct-l-' + c.id" type="text" [name]="'l-' + c.id" [(ngModel)]="c.label" />
          </div>
          <div class="field">
            <label [for]="'ct-u-' + c.id">Enlace</label>
            <input [id]="'ct-u-' + c.id" type="text" [name]="'u-' + c.id" [(ngModel)]="c.url" />
            <small>Empieza con https:// o mailto:</small>
          </div>
          <div><button class="btn danger small" type="button" (click)="remove(i)">Quitar {{ c.label }}</button></div>
        </div>
      }
      <div class="row-actions">
        <button class="btn ghost" type="button" (click)="add()">Agregar medio</button>
        <button class="btn" type="submit">Guardar contacto</button>
      </div>
      <p class="status" role="status">{{ message() }}</p>
    </form>
  `,
})
export class ContactEditor {
  private readonly store = inject(PortfolioStore);
  protected draft: ContactLink[] = this.store.contact().map((c) => ({ ...c }));
  protected readonly message = signal('');

  protected add(): void {
    this.draft.push({ id: newId('ct'), label: '', url: '' });
  }

  protected remove(i: number): void {
    this.draft.splice(i, 1);
  }

  protected save(): void {
    const filled = this.draft.filter((c) => c.label.trim() || c.url.trim());
    const bad = filled.find((c) => !c.label.trim() || !VALID.test(c.url.trim()));
    if (bad) {
      this.message.set('Cada medio necesita nombre y un enlace que empiece con https://, http:// o mailto:.');
      return;
    }
    this.store.setContact(filled.map((c) => ({ ...c, label: c.label.trim(), url: c.url.trim() })));
    this.draft = filled;
    this.message.set('Contacto guardado.');
  }
}
