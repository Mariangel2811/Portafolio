import { Routes } from '@angular/router';
import { Editor } from './pages/editor';
import { Home } from './pages/home';
import { ProjectDetail } from './pages/project-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'editar', component: Editor },
  { path: 'proyectos/:id', component: ProjectDetail },
];
