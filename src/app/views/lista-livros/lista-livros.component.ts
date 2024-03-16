import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {
  campoBuscar: string = '';
  listaLivros: [];
  subscription :Subscription;

  constructor(private service: LivroService) { }

  buscarLivros() {
    this.subscription = this.service.buscar(this.campoBuscar).subscribe(
      {
        next: (resultadoAPI) => console.log(resultadoAPI),
        error: (erro) => console.log(erro)
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}



