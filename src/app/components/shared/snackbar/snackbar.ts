import { Component, inject } from '@angular/core';
import { NotificacaoService } from '../../../services/notificacao';

@Component({
  selector: 'app-snackbar',
  imports: [],
  templateUrl: './snackbar.html',
  styleUrl: './snackbar.sass',
})
export class Snackbar {
  notificacaoService = inject(NotificacaoService);

  fechar(id: number): void {
    this.notificacaoService.remover(id);
  }
}
