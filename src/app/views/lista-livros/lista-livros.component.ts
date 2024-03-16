import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Livro } from 'src/app/models/interface';
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

  livrosResultadoParaLivros(items): Livro[] {
   const livros: Livro[] = [];

    livros.push(
      items.forEach( (item) => {
        this.livro = {
          title: item.VolumeInfo?.title,
          authors: item.VolumeInfo?.authors,
          publisher: item.VolumeInfo?.publisher,
          publishedDate: item.VolumeInfo?.publishedDate,
          description: item.VolumeInfo?.description,
          previewLink: item.VolumeInfo?.previewLink,
          thumbnail: item.VolumeInfo?.imageLinks?.thumbnail
        }
      })
    );
    console.log(livros);

    return livros;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}



