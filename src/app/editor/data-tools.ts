import { Component, inject, signal } from '@angular/core';
import { PortfolioStore } from '../data/portfolio-store';

@Component({
  selector: 'app-data-tools',
  template: `
    <section class="panel" aria-labelledby="dt-titulo">
      <h2 id="dt-titulo">Respaldo del contenido</h2>
      <p>El contenido vive en este navegador. Descárgalo para respaldarlo o llevarlo a otro equipo.</p>
      <div class="row-actions">
        <button class="btn" type="button" (click)="download()">Descargar contenido (JSON)</button>
        <button class="btn danger" type="button" (click)="reset()">Restaurar contenido inicial</button>
      </div>
      <div class="field import">
        <label for="dt-file">Importar contenido (JSON)</label>
        <input id="dt-file" type="file" accept="application/json,.json" (change)="import($event)" />
      </div>
      <p class="status" role="status">{{ message() }}</p>
    </section>
  `,
  styles: `.import { margin-top: 1.5rem; }`,
})
export class DataTools {
  private readonly store = inject(PortfolioStore);
  protected readonly message = signal('');

  protected download(): void {
    const blob = new Blob([this.store.exportJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portafolio.json';
    a.click();
    URL.revokeObjectURL(url);
    this.message.set('Contenido descargado.');
  }

  protected async import(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const ok = this.store.importJson(await file.text());
    this.message.set(ok ? 'Contenido importado.' : 'El archivo no tiene el formato esperado.');
    input.value = '';
  }

  protected reset(): void {
    if (!confirm('Se perderán tus cambios y volverá el contenido inicial. ¿Continuar?')) return;
    this.store.reset();
    this.message.set('Contenido inicial restaurado.');
  }
}
