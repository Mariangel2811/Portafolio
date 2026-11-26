import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { readImage } from '../core/image';
import { PortfolioStore } from '../data/portfolio-store';

interface Draft {
  title: string;
  summary: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  technologies: string;
  demoUrl: string;
  repoUrl: string;
}

const EMPTY: Draft = {
  title: '', summary: '', description: '', imageUrl: '', imageAlt: '',
  technologies: '', demoUrl: '', repoUrl: '',
};
const HTTP = /^https?:\/\/\S+$/i;

@Component({
  selector: 'app-projects-editor',
  imports: [FormsModule, RouterLink],
  template: `
    <section class="panel" aria-labelledby="pe-lista">
      <h2 id="pe-lista">Proyectos ({{ projects().length }})</h2>
      <ul class="list">
        @for (p of projects(); track p.id) {
          <li>
            <span class="name">{{ p.title }}</span>
            <span class="row-actions">
              <a class="btn ghost small" [routerLink]="['/proyectos', p.id]">Ver</a>
              <button class="btn ghost small" type="button" (click)="edit(p.id)">Editar<span class="visually-hidden"> {{ p.title }}</span></button>
              <button class="btn danger small" type="button" (click)="remove(p.id, p.title)">Retirar<span class="visually-hidden"> {{ p.title }}</span></button>
            </span>
          </li>
        } @empty {
          <li class="muted">No hay proyectos. Agrega el primero abajo.</li>
        }
      </ul>
    </section>

    <form class="panel" (ngSubmit)="save()" aria-labelledby="pe-form">
      <h2 id="pe-form">{{ editingId() ? 'Modificar proyecto' : 'Agregar proyecto' }}</h2>
      <div class="field">
        <label for="pj-title">Título</label>
        <input id="pj-title" type="text" name="title" [(ngModel)]="draft.title" required />
      </div>
      <div class="field">
        <label for="pj-summary">Resumen (se muestra en el listado)</label>
        <input id="pj-summary" type="text" name="summary" [(ngModel)]="draft.summary" />
      </div>
      <div class="field">
        <label for="pj-desc">Descripción ampliada</label>
        <textarea id="pj-desc" name="description" [(ngModel)]="draft.description"></textarea>
      </div>
      <div class="two">
        <div class="field">
          <label for="pj-img">Dirección de la imagen</label>
          <input id="pj-img" type="text" name="imageUrl" [(ngModel)]="draft.imageUrl" />
        </div>
        <div class="field">
          <label for="pj-file">O sube una imagen</label>
          <input id="pj-file" type="file" accept="image/*" (change)="upload($event)" />
        </div>
      </div>
      <div class="field">
        <label for="pj-alt">Texto alternativo de la imagen</label>
        <input id="pj-alt" type="text" name="imageAlt" [(ngModel)]="draft.imageAlt" />
      </div>
      <div class="field">
        <label for="pj-tech">Tecnologías</label>
        <input id="pj-tech" type="text" name="technologies" [(ngModel)]="draft.technologies" />
        <small>Sepáralas con comas.</small>
      </div>
      <div class="two">
        <div class="field">
          <label for="pj-demo">Enlace de demostración (opcional)</label>
          <input id="pj-demo" type="text" name="demoUrl" [(ngModel)]="draft.demoUrl" />
        </div>
        <div class="field">
          <label for="pj-repo">Enlace del código (opcional)</label>
          <input id="pj-repo" type="text" name="repoUrl" [(ngModel)]="draft.repoUrl" />
        </div>
      </div>
      <div class="row-actions">
        <button class="btn" type="submit">{{ editingId() ? 'Guardar cambios' : 'Agregar proyecto' }}</button>
        @if (editingId()) {
          <button class="btn ghost" type="button" (click)="cancel()">Cancelar edición</button>
        }
      </div>
      <p class="status" role="status">{{ message() }}</p>
    </form>
  `,
  styles: `
    .list { list-style: none; margin: 0; padding: 0; }
    .list li { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: .5rem 1rem; padding: .6rem 0; border-bottom: 1px solid var(--line); }
    .name { font-weight: 600; }
  `,
})
export class ProjectsEditor {
  private readonly store = inject(PortfolioStore);
  protected readonly projects = this.store.projects;
  protected readonly editingId = signal<string | null>(null);
  protected readonly message = signal('');
  protected draft: Draft = { ...EMPTY };

  protected edit(id: string): void {
    const p = this.store.projectById(id);
    if (!p) return;
    this.draft = { ...p, technologies: p.technologies.join(', ') };
    this.editingId.set(id);
    this.message.set(`Editando «${p.title}».`);
    document.getElementById('pe-form')?.scrollIntoView({ block: 'start' });
  }

  protected cancel(): void {
    this.draft = { ...EMPTY };
    this.editingId.set(null);
    this.message.set('');
  }

  protected remove(id: string, title: string): void {
    if (!confirm(`¿Retirar el proyecto «${title}»? Dejará de mostrarse en el sitio.`)) return;
    this.store.removeProject(id);
    if (this.editingId() === id) this.cancel();
    this.message.set(`Proyecto «${title}» retirado.`);
  }

  protected save(): void {
    const d = this.draft;
    if (!d.title.trim()) {
      this.message.set('El proyecto necesita un título.');
      return;
    }
    const demo = d.demoUrl.trim();
    const repo = d.repoUrl.trim();
    if ((demo && !HTTP.test(demo)) || (repo && !HTTP.test(repo))) {
      this.message.set('Los enlaces deben empezar con https:// o http://.');
      return;
    }
    const data = {
      title: d.title.trim(),
      summary: d.summary.trim(),
      description: d.description.trim(),
      imageUrl: d.imageUrl.trim(),
      imageAlt: d.imageAlt.trim(),
      technologies: d.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      demoUrl: demo,
      repoUrl: repo,
    };
    const id = this.editingId();
    if (id) {
      this.store.updateProject(id, data);
      this.message.set(`Cambios guardados en «${data.title}».`);
    } else {
      this.store.addProject(data);
      this.message.set(`Proyecto «${data.title}» agregado.`);
    }
    this.draft = { ...EMPTY };
    this.editingId.set(null);
  }

  protected async upload(event: Event): Promise<void> {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    try {
      this.draft.imageUrl = await readImage(file);
      this.message.set('Imagen cargada. Guarda para aplicarla.');
    } catch (e) {
      this.message.set((e as Error).message);
    }
  }
}
