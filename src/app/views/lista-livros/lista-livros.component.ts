import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Livro } from 'src/app/models/interface';
import { LivroVolume } from 'src/app/models/livroVolumeItem';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {
  campoBuscar: string = '';
  listaLivros: Livro[];
  subscription :Subscription;
  livro: Livro;

  constructor(private service: LivroService) { }

  buscarLivros() {
    this.subscription = this.service.buscar(this.campoBuscar).subscribe(
      {
        next: items => this.listaLivros = this.livrosResultadoParaLivros(items),
        error: (erro) => console.log(erro)
      }
    );
  }

  livrosResultadoParaLivros(items): LivroVolume[] {
    return items.map( (item) => {
      return new LivroVolume(item);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}



