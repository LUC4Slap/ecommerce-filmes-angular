import { Component, inject } from '@angular/core';
import { Carrinho } from '../../services/carrinho';
import { Filme } from '../../interfaces/filme.interface';
import { NotificacaoService } from '../../services/notificacao';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.html',
  styleUrl: './checkout.sass',
})
export class Checkout {
  carrinho = inject(Carrinho);
  private notificacao = inject(NotificacaoService);
  
  calcularTotal(): number {
    return this.carrinho.totalItens().reduce((total, filme) => total + filme.price, 0);
  }

  removerItem(filme: Filme): void {
    this.carrinho.removerItem(filme);
    this.notificacao.info('Filme removido do carrinho.');
  }

  limparCarrinho(): void {
    this.carrinho.limparCarrinho();
    this.notificacao.info('Carrinho limpo.');
  }
}
