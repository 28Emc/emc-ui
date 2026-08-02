import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LucideMoon, LucideSun } from '@lucide/angular';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, LucideMoon, LucideSun],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('emc-ui');
  protected readonly dark = signal(false);

  constructor() {
    if (localStorage.getItem('emc-ui-theme') === 'dark') {
      this.dark.set(true);
      document.documentElement.classList.add('dark');
    }
  }

  protected toggleDark(): void {
    this.dark.update((value) => !value);
    document.documentElement.classList.toggle('dark', this.dark());
    localStorage.setItem('emc-ui-theme', this.dark() ? 'dark' : 'light');
  }
}
