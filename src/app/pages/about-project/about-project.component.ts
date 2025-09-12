import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-about-project.component',
  imports: [RouterOutlet],
  templateUrl: './about-project.component.html',
  styleUrl: './about-project.component.css',
  standalone: true,
})
export class AboutProjectComponent {
  constructor(private router: Router) {}

  navigateToMain() {
    this.router.navigate(['']);
  }
}
