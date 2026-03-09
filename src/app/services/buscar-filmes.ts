import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filme } from '../interfaces/filme.interface';

@Injectable({
  providedIn: 'root',
})
export class BuscarFilmes {
  private apiUrl = 'http://localhost:3000/filmes';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  buscarFilmes(): Observable<Filme[]> {
    return this.http.get<Filme[]>(this.apiUrl);
  }

  buscarFilmePorId(id: string | number): Observable<Filme> {
    return this.http.get<Filme>(`${this.apiUrl}/${id}`);
  }

  adicionarNovoFilme(filme: Partial<Filme>): Observable<Filme> {
    return this.http.post<Filme>(this.apiUrl, filme, this.httpOptions);
  }
}
