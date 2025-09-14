import { provideRouter, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { DevlogComponent } from './pages/devlog/devlog.component';
import { AboutProjectComponent } from './pages/about-project/about-project.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'devlog', component: DevlogComponent },
  { path: 'about_project', component: AboutProjectComponent },
];

export const appRouting = provideRouter(routes);