import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { newId } from '../core/ids';
import { PortfolioStore } from '../data/portfolio-store';
import { TimelineEntry } from '../data/portfolio.model';

@Component({
  selector: 'app-timeline-editor',
  imports: [FormsModule],
  template: `
    <form class="panel" (ngSubmit)="save()">
      <h2>Formación y experiencia</h2>
      @for (e of draft; track e.id; let i = $index) {
        <fieldset class="panel">
          <legend>Entrada {{ i + 1 }}</legend>
          <div class="two">
            <div class="field">
              <label [for]="'tl-k-' + e.id">Tipo</label>
              <select [id]="'tl-k-' + e.id" [name]="'k-' + e.id" [(ngModel)]="e.kind">
                <option value="formacion">Formación</option>
                <option value="experiencia">Experiencia</option>
              </select>
            </div>
            <div class="field">
              <label [for]="'tl-t-' + e.id">Título</label>
              <input [id]="'tl-t-' + e.id" type="text" [name]="'t-' + e.id" [(ngModel)]="e.title" />
            </div>
            <div class="field">
              <label [for]="'tl-p-' + e.id">Lugar</label>
              <input [id]="'tl-p-' + e.id" type="text" [name]="'p-' + e.id" [(ngModel)]="e.place" />
            </div>
            <div class="field">
              <label [for]="'tl-r-' + e.id">Periodo</label>
              <input [id]="'tl-r-' + e.id" type="text" [name]="'r-' + e.id" [(ngModel)]="e.period" />
            </div>
          </div>
          <div class="field">
            <label [for]="'tl-d-' + e.id">Descripción</label>
            <textarea [id]="'tl-d-' + e.id" [name]="'d-' + e.id" [(ngModel)]="e.description"></textarea>
          </div>
          <button class="btn danger small" type="button" (click)="remove(i)">Quitar entrada {{ e.title }}</button>
        </fieldset>
      }
      <div class="row-actions">
        <button class="btn ghost" type="button" (click)="add()">Agregar entrada</button>
        <button class="btn" type="submit">Guardar trayectoria</button>
      </div>
      <p class="status" role="status">{{ message() }}</p>
    </form>
  `,
  styles: `fieldset { border: 1px solid var(--line); } legend { font-weight: 600; padding-inline: .4rem; }`,
})
export class TimelineEditor {
  private readonly store = inject(PortfolioStore);
  protected draft: TimelineEntry[] = this.store.timeline().map((e) => ({ ...e }));
  protected readonly message = signal('');

  protected add(): void {
    this.draft.push({ id: newId('tl'), kind: 'formacion', title: '', place: '', period: '', description: '' });
  }

  protected remove(i: number): void {
    this.draft.splice(i, 1);
  }

  protected save(): void {
    this.store.setTimeline(this.draft.filter((e) => e.title.trim()).map((e) => ({ ...e, title: e.title.trim() })));
    this.message.set('Trayectoria guardada.');
  }
}
