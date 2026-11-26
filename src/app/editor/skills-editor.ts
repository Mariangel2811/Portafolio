import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { newId } from '../core/ids';
import { PortfolioStore } from '../data/portfolio-store';

interface Draft { id: string; title: string; items: string; }

@Component({
  selector: 'app-skills-editor',
  imports: [FormsModule],
  template: `
    <form class="panel" (ngSubmit)="save()">
      <h2>Habilidades</h2>
      @for (g of draft; track g.id; let i = $index) {
        <fieldset class="panel">
          <legend>Grupo {{ i + 1 }}</legend>
          <div class="field">
            <label [for]="'sk-t-' + g.id">Nombre del grupo</label>
            <input [id]="'sk-t-' + g.id" type="text" [name]="'t-' + g.id" [(ngModel)]="g.title" />
          </div>
          <div class="field">
            <label [for]="'sk-i-' + g.id">Habilidades</label>
            <input [id]="'sk-i-' + g.id" type="text" [name]="'i-' + g.id" [(ngModel)]="g.items" />
            <small>Sepáralas con comas.</small>
          </div>
          <button class="btn danger small" type="button" (click)="remove(i)">Quitar grupo {{ g.title }}</button>
        </fieldset>
      }
      <div class="row-actions">
        <button class="btn ghost" type="button" (click)="add()">Agregar grupo</button>
        <button class="btn" type="submit">Guardar habilidades</button>
      </div>
      <p class="status" role="status">{{ message() }}</p>
    </form>
  `,
  styles: `fieldset { border: 1px solid var(--line); } legend { font-weight: 600; padding-inline: .4rem; }`,
})
export class SkillsEditor {
  private readonly store = inject(PortfolioStore);
  protected draft: Draft[] = this.store.skills().map((s) => ({ id: s.id, title: s.title, items: s.items.join(', ') }));
  protected readonly message = signal('');

  protected add(): void {
    this.draft.push({ id: newId('sk'), title: '', items: '' });
  }

  protected remove(i: number): void {
    this.draft.splice(i, 1);
  }

  protected save(): void {
    this.store.setSkills(
      this.draft
        .filter((g) => g.title.trim())
        .map((g) => ({
          id: g.id,
          title: g.title.trim(),
          items: g.items.split(',').map((x) => x.trim()).filter(Boolean),
        })),
    );
    this.message.set('Habilidades guardadas.');
  }
}
