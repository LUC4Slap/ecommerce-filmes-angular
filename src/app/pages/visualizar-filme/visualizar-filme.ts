import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BuscarFilmes } from '../../services/buscar-filmes';
import { Filme } from '../../interfaces/filme.interface';

@Component({
  selector: 'app-visualizar-filme',
  imports: [RouterLink],
  templateUrl: './visualizar-filme.html',
  styleUrl: './visualizar-filme.sass',
})
export class VisualizarFilme implements OnInit {
  filme = signal<Filme | null>(null);
  filmeId = signal<number>(0);

  constructor(
    private route: ActivatedRoute,
    private buscarFilmes: BuscarFilmes,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Pega o ID da rota
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.filmeId.set(id);
      this.carregarFilme(id);
    });
  }

  carregarFilme(id: number): void {
    this.buscarFilmes.buscarFilmePorId(id).subscribe({
      next: (filme) => {
        this.filme.set(filme);
      },
      error: (erro) => {
        console.error('Erro ao buscar filme:', erro);
      }
    });
  }

  voltar(): void {
    this.router.navigate(['/']);
  }
}
