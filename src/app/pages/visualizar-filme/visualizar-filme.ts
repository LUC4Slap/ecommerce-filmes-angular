import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BuscarFilmes } from '../../services/buscar-filmes';
import { Filme } from '../../interfaces/filme.interface';
import { Carrinho } from '../../services/carrinho';
import { NotificacaoService } from '../../services/notificacao';

@Component({
  selector: 'app-visualizar-filme',
  imports: [RouterLink],
  templateUrl: './visualizar-filme.html',
  styleUrl: './visualizar-filme.sass',
})
export class VisualizarFilme implements OnInit {
  filme = signal<Filme | null>(null);
  filmeId = signal<number>(0);
  private carrinhoService = inject(Carrinho);
  private notificacao = inject(NotificacaoService);

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

  adicionarAoCarrinho(): void {
    const filmeAtual = this.filme();
    if (filmeAtual) {
      this.carrinhoService.adicionarItem(filmeAtual);
      this.notificacao.sucesso('Filme adicionado ao carrinho!');
    }
  }

  voltar(): void {
    this.router.navigate(['/']);
  }
}
