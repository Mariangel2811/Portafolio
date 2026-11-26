import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { PortfolioStore, slugify } from './portfolio-store';

const nuevo = {
  title: 'Mi Proyecto Ñandú',
  summary: 's',
  description: 'd',
  imageUrl: '',
  imageAlt: '',
  technologies: ['Angular'],
  demoUrl: '',
  repoUrl: '',
};

describe('PortfolioStore', () => {
  let store: PortfolioStore;

  beforeEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
    store = TestBed.inject(PortfolioStore);
  });

  it('slugify elimina acentos y símbolos', () => {
    expect(slugify('Mi Proyecto Ñandú!')).toBe('mi-proyecto-nandu');
  });

  it('agrega un proyecto y se refleja en la lista', () => {
    const antes = store.projects().length;
    const id = store.addProject(nuevo);
    expect(store.projects().length).toBe(antes + 1);
    expect(store.projectById(id)?.title).toBe(nuevo.title);
  });

  it('genera ids únicos para títulos repetidos', () => {
    const a = store.addProject(nuevo);
    const b = store.addProject(nuevo);
    expect(a).not.toBe(b);
  });

  it('modifica y retira proyectos', () => {
    const id = store.addProject(nuevo);
    store.updateProject(id, { ...nuevo, title: 'Otro título' });
    expect(store.projectById(id)?.title).toBe('Otro título');
    store.removeProject(id);
    expect(store.projectById(id)).toBeUndefined();
  });

  it('actualiza el perfil sin tocar el resto', () => {
    const n = store.projects().length;
    store.updateProfile({ ...store.profile(), name: 'Ana Pérez' });
    expect(store.profile().name).toBe('Ana Pérez');
    expect(store.projects().length).toBe(n);
  });

  it('persiste en localStorage y restaura', () => {
    store.updateProfile({ ...store.profile(), name: 'Persistido' });
    TestBed.resetTestingModule();
    expect(TestBed.inject(PortfolioStore).profile().name).toBe('Persistido');
  });

  it('exporta, importa y rechaza JSON inválido', () => {
    const json = store.exportJson();
    expect(store.importJson(json)).toBe(true);
    expect(store.importJson('{"x":1}')).toBe(false);
    expect(store.importJson('no es json')).toBe(false);
  });

  it('reset vuelve al contenido inicial', () => {
    store.removeProject(store.projects()[0].id);
    store.reset();
    expect(store.projects().length).toBe(4);
  });
});
