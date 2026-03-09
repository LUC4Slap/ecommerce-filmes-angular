import { Injectable, signal } from '@angular/core';

export interface Notificacao {
  mensagem: string;
  tipo: 'sucesso' | 'erro' | 'info';
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class NotificacaoService {
  private _notificacoes = signal<Notificacao[]>([]);
  notificacoes = this._notificacoes.asReadonly();
  private nextId = 0;

  mostrar(mensagem: string, tipo: 'sucesso' | 'erro' | 'info' = 'sucesso'): void {
    const notificacao: Notificacao = {
      mensagem,
      tipo,
      id: this.nextId++
    };

    this._notificacoes.update(notifs => [...notifs, notificacao]);

    // Remove após 3 segundos
    setTimeout(() => {
      this.remover(notificacao.id);
    }, 3000);
  }

  remover(id: number): void {
    this._notificacoes.update(notifs => notifs.filter(n => n.id !== id));
  }

  sucesso(mensagem: string): void {
    this.mostrar(mensagem, 'sucesso');
  }

  erro(mensagem: string): void {
    this.mostrar(mensagem, 'erro');
  }

  info(mensagem: string): void {
    this.mostrar(mensagem, 'info');
  }
}
