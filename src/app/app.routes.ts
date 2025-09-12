import { provideRouter, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AboutProjectComponent } from './pages/about-project/about-project.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'about_us', component: AboutUsComponent },
  { path: 'about_project', component: AboutProjectComponent },
];

export const appRouting = provideRouter(routes);