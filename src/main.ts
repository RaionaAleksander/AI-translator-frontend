import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { appRouting } from './app/app.routes';
import { App } from './app/app';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    appRouting,
  ]
}).catch(err => console.error(err));