import { Injectable, computed, signal } from '@angular/core';
import { DEFAULT_PORTFOLIO } from './default-portfolio';
import {
  ContactLink,
  Portfolio,
  Profile,
  Project,
  SkillGroup,
  TimelineEntry,
} from './portfolio.model';

export const STORAGE_KEY = 'portafolio.contenido.v1';

/** Convierte un título en un id apto para URL. */
export function slugify(text: string): string {
  const base = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return base || 'proyecto';
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function isPortfolio(value: unknown): value is Portfolio {
  const v = value as Portfolio;
  return (
    !!v &&
    typeof v === 'object' &&
    !!v.profile &&
    typeof v.profile.name === 'string' &&
    Array.isArray(v.skills) &&
    Array.isArray(v.timeline) &&
    Array.isArray(v.contact) &&
    Array.isArray(v.projects)
  );
}

/**
 * Única fuente de verdad del contenido. Todas las vistas leen de aquí
 * y todo cambio se guarda en localStorage.
 */
@Injectable({ providedIn: 'root' })
export class PortfolioStore {
  private readonly state = signal<Portfolio>(this.load());

  readonly profile = computed(() => this.state().profile);
  readonly skills = computed(() => this.state().skills);
  readonly timeline = computed(() => this.state().timeline);
  readonly contact = computed(() => this.state().contact);
  readonly projects = computed(() => this.state().projects);
  readonly education = computed(() => this.timeline().filter((t) => t.kind === 'formacion'));
  readonly experience = computed(() => this.timeline().filter((t) => t.kind === 'experiencia'));

  projectById(id: string): Project | undefined {
    return this.state().projects.find((p) => p.id === id);
  }

  updateProfile(profile: Profile): void {
    this.commit({ ...this.state(), profile: { ...profile } });
  }

  setSkills(skills: SkillGroup[]): void {
    this.commit({ ...this.state(), skills: clone(skills) });
  }

  setTimeline(timeline: TimelineEntry[]): void {
    this.commit({ ...this.state(), timeline: clone(timeline) });
  }

  setContact(contact: ContactLink[]): void {
    this.commit({ ...this.state(), contact: clone(contact) });
  }

  /** Agrega un proyecto y devuelve su id (único). */
  addProject(project: Omit<Project, 'id'>): string {
    const id = this.uniqueId(slugify(project.title));
    this.commit({ ...this.state(), projects: [...this.state().projects, { ...project, id }] });
    return id;
  }

  updateProject(id: string, changes: Omit<Project, 'id'>): void {
    this.commit({
      ...this.state(),
      projects: this.state().projects.map((p) => (p.id === id ? { ...changes, id } : p)),
    });
  }

  removeProject(id: string): void {
    this.commit({ ...this.state(), projects: this.state().projects.filter((p) => p.id !== id) });
  }

  exportJson(): string {
    return JSON.stringify(this.state(), null, 2);
  }

  /** Devuelve true si el JSON era válido y se aplicó. */
  importJson(json: string): boolean {
    try {
      const parsed: unknown = JSON.parse(json);
      if (!isPortfolio(parsed)) return false;
      this.commit(parsed);
      return true;
    } catch {
      return false;
    }
  }

  reset(): void {
    this.commit(clone(DEFAULT_PORTFOLIO));
  }

  private uniqueId(base: string): string {
    const taken = new Set(this.state().projects.map((p) => p.id));
    if (!taken.has(base)) return base;
    let n = 2;
    while (taken.has(`${base}-${n}`)) n++;
    return `${base}-${n}`;
  }

  private commit(next: Portfolio): void {
    this.state.set(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* almacenamiento lleno o bloqueado: el cambio sigue en memoria */
    }
  }

  private load(): Portfolio {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (isPortfolio(parsed)) return parsed;
      }
    } catch {
      /* se usa el contenido semilla */
    }
    return clone(DEFAULT_PORTFOLIO);
  }
}
