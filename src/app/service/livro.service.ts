import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Items , LivrosResultado } from '../models/interface';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API: string = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  buscar(valorDigitado: string): Observable<Items[]>{
    const params = new HttpParams().append('q', valorDigitado);
    return this.http.get<LivrosResultado>(this.API, { params } ).pipe(
      tap((RETORNOAPI)=> console.log('fluxo do tap',RETORNOAPI)),
      map(resultadoAPI => resultadoAPI.items),
      tap(resultado => console.log('fluxo após o map',resultado))
    );
  }
}
