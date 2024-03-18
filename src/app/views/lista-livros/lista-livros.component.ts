import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EMPTY, catchError, debounceTime, distinctUntilChanged, filter, map, of, switchMap, throwError } from 'rxjs';
import { LivrosResultado } from 'src/app/models/interface';
import { LivroVolume } from 'src/app/models/livroVolumeItem';
import { LivroService } from 'src/app/service/livro.service';

const PAUSA = 300;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent{

  campoBuscar = new FormControl();
  mensagemError = '';
  livrosResultado: LivrosResultado;
  listaDeLivros: LivroVolume[];

  constructor(private service: LivroService) { }

  livrosEncontrados$ = this.campoBuscar.valueChanges.pipe(
    debounceTime(PAUSA),
    filter((valorDigitado) => valorDigitado.length >= 3),
    switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
    map(resultado => this.livrosResultado = resultado),
    map(resultado => resultado.items ?? []),
    map(items => this.listaDeLivros =   this.livrosResultadoParaLivros(items)),
    catchError(erro =>
      { console.log(erro);
        return throwError(() =>
        new Error(this.mensagemError = `Ops, ocorreu um erro! Recarregue a aplicação!`));
      })
  );

  livrosResultadoParaLivros(items): LivroVolume[] {
    return items.map( (item) => {
      return new LivroVolume(item);
    });
  }

}



