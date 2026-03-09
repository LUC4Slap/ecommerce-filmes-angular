import { Component, OnInit, signal } from '@angular/core';
import { BuscarFilmes } from '../../services/buscar-filmes';
import { Filme } from '../../interfaces/filme.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
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
