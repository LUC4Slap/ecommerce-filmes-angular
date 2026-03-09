import { Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Filme } from '../../interfaces/filme.interface';
import { BuscarFilmes } from '../../services/buscar-filmes';

@Component({
  selector: 'app-cadastrar-filme',
  imports: [RouterLink, FormsModule],
  templateUrl: './cadastrar-filme.html',
  styleUrl: './cadastrar-filme.sass',
})
export class CadastrarFilme {
  tituloDoFilme = signal<string>('');
  price = signal<number>(0);
  categoria = signal<string>('');
  imagemUrl = signal<string>('');

  constructor(private buscarFilmes: BuscarFilmes, private router: Router) {
  }

  cadastrarFilme(): void {
    // Validação dos campos
    if (!this.tituloDoFilme() || !this.categoria() || !this.imagemUrl() || this.price() <= 0) {
      console.log('VALIDAÇÃO FALHOU!');
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    const novoFilme: Partial<Filme> = {
      id: Date.now().toString(),
      name: this.tituloDoFilme(),
      category: this.categoria(),
      price: Number(this.price()),
      image: this.imagemUrl()
    }
    
    console.log('Enviando filme para o servidor:', JSON.stringify(novoFilme));
    
    this.buscarFilmes.adicionarNovoFilme(novoFilme).subscribe({
      next: (response) => {
        alert('Filme cadastrado com sucesso!');
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Erro completo:', error);
        console.error('Status:', error.status);
        console.error('Message:', error.message);
        alert(`Erro ao cadastrar: ${error.status || error.message || 'Verifique se o json-server está rodando'}`);
      }
    });
  }
}
