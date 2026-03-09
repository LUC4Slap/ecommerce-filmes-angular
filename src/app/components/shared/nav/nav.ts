import { Component, inject } from '@angular/core';
import { Carrinho } from '../../../services/carrinho';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.html',
  styleUrl: './nav.sass',
})
export class Nav {
  carrinho = inject(Carrinho);
  private router = inject(Router);

  checkout(): void {
    this.router.navigate(['/checkout']);
  }
}
