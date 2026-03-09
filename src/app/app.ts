import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './components/shared/nav/nav';
import { Snackbar } from './components/shared/snackbar/snackbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Snackbar],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  protected readonly title = signal('ecommerce-simples-filmes');
}
