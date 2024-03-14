import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly API: string = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  buscar(valorDigitado: string){
    const  param = new HttpParams().append('q', valorDigitado);
    this.http.get(this.API,{ param });
  }
}
