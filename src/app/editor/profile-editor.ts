import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { readImage } from '../core/image';
import { PortfolioStore } from '../data/portfolio-store';

@Component({
  selector: 'app-profile-editor',
  imports: [FormsModule],
  template: `
    <form class="panel" (ngSubmit)="save()">
      <h2>Presentación</h2>
      <div class="two">
        <div class="field">
          <label for="pf-name">Nombre</label>
          <input id="pf-name" type="text" name="name" [(ngModel)]="draft.name" required />
        </div>
        <div class="field">
          <label for="pf-headline">Perfil profesional</label>
          <input id="pf-headline" type="text" name="headline" [(ngModel)]="draft.headline" required />
        </div>
      </div>
      <div class="field">
        <label for="pf-summary">Descripción</label>
        <textarea id="pf-summary" name="summary" [(ngModel)]="draft.summary"></textarea>
      </div>
      <div class="two">
        <div class="field">
          <label for="pf-photo">Dirección de la imagen</label>
          <input id="pf-photo" type="text" name="photoUrl" [(ngModel)]="draft.photoUrl" />
        </div>
        <div class="field">
          <label for="pf-file">O sube una imagen</label>
          <input id="pf-file" type="file" accept="image/*" (change)="upload($event)" />
        </div>
      </div>
      <div class="field">
        <label for="pf-alt">Texto alternativo de la imagen</label>
        <input id="pf-alt" type="text" name="photoAlt" [(ngModel)]="draft.photoAlt" />
        <small>Describe la imagen para quien usa lector de pantalla.</small>
      </div>
      <h2>Buscadores</h2>
      <div class="field">
        <label for="pf-seo-t">Título de la página</label>
        <input id="pf-seo-t" type="text" name="seoTitle" [(ngModel)]="draft.seoTitle" />
      </div>
      <div class="field">
        <label for="pf-seo-d">Descripción para buscadores</label>
        <textarea id="pf-seo-d" name="seoDescription" [(ngModel)]="draft.seoDescription"></textarea>
      </div>
      <div class="row-actions">
        <button class="btn" type="submit">Guardar presentación</button>
      </div>
      <p class="status" role="status">{{ message() }}</p>
    </form>
  `,
})
export class ProfileEditor {
  private readonly store = inject(PortfolioStore);
  protected draft = { ...this.store.profile() };
  protected readonly message = signal('');

  protected save(): void {
    this.store.updateProfile(this.draft);
    this.message.set('Presentación guardada.');
  }

  protected async upload(event: Event): Promise<void> {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    try {
      this.draft.photoUrl = await readImage(file);
      this.message.set('Imagen cargada. Guarda para aplicarla.');
    } catch (e) {
      this.message.set((e as Error).message);
    }
  }
}
