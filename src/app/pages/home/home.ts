import { Component, OnInit, signal } from '@angular/core';
import { BuscarFilmes } from '../../services/buscar-filmes';
import { Filme } from '../../interfaces/filme.interface';
import { CardFilme } from '../card-filme/card-filme';

@Component({
  selector: 'app-home',
  imports: [CardFilme],
  templateUrl: './home.html',
  styleUrl: './home.sass'
})
export class Home implements OnInit {
  filmes = signal<Filme[]>([]);
  constructor(private buscarFilmes: BuscarFilmes){}

  ngOnInit(): void {
    console.log('Home component initialized');
    this.buscarFilmesDb();
  }

  buscarFilmesDb() {
    this.buscarFilmes.buscarFilmes().subscribe((filmes: Filme[]) => {
      // log('Filmes buscados:', filmes);
      this.filmes.set(filmes);
    });
  }
}
