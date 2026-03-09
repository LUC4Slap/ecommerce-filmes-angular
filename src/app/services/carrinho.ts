import { Injectable, signal, effect } from '@angular/core';
import { Filme } from '../interfaces/filme.interface';

@Injectable({
  providedIn: 'root',
})
export class Carrinho {
  private readonly STORAGE_KEY = 'carrinho_filmes';
  
  // Signal privado para armazenar a quantidade total
  private _totalItens = signal<Filme[]>(this.carregarCarrinho());

  // Signal público (readonly) para ler a quantidade
  totalItens = this._totalItens.asReadonly();

  constructor() {
    // Effect para salvar no localStorage sempre que o carrinho mudar
    effect(() => {
      const itens = this._totalItens();
      this.salvarCarrinho(itens);
    });
  }

  // Carrega o carrinho do localStorage
  private carregarCarrinho(): Filme[] {
    if (typeof window === 'undefined') {
      return [];
    }
    try {
      const dados = localStorage.getItem(this.STORAGE_KEY);
      return dados ? JSON.parse(dados) : [];
    } catch {
      return [];
    }
  }

  // Salva o carrinho no localStorage
  private salvarCarrinho(itens: Filme[]): void {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(itens));
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error);
    }
  }

  // Adiciona um item ao carrinho
  adicionarItem(filme: Filme): void {
    this._totalItens.update(total => [...total, filme]);
  }

  // Remove um item do carrinho
  removerItem(filme: Filme): void {
    this._totalItens.update(total => total.filter(item => item !== filme));
  }

  // Limpa o carrinho
  limparCarrinho(): void {
    this._totalItens.set([]);
  }
}
