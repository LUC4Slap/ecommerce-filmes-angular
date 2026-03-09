import { Component, Input } from '@angular/core';
import { Filme } from '../../interfaces/filme.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-filme',
  imports: [RouterLink],
  templateUrl: './card-filme.html',
  styleUrl: './card-filme.sass',
})
export class CardFilme {
  @Input() filme!: Filme;
}
