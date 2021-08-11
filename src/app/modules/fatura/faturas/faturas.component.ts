import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IFatura } from '@app/shared/interfaces/IFatura';
import { IUnidadeConsumidora } from '@app/shared/interfaces/IUnidadeConsumidora';
import { FaturaService } from '@app/shared/services/fatura.service';
import { UnidadeConsumidoraService } from '@app/shared/services/unidade-consumidora.service';
import { faEye, faPencilAlt, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-faturas',
  templateUrl: './faturas.component.html',
  styleUrls: ['./faturas.component.scss']
})
export class FaturasComponent implements OnInit {

  faEye = faEye;
  faPencil = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlus;

  faturas: IFatura[];

  isLoading = false;

  constructor(
    private faturaService: FaturaService,
    private unidadeConsumidoraService: UnidadeConsumidoraService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.faturaService.getAll()
      .subscribe((faturas: IFatura[]) => {
        this.faturas = faturas;

        let unidades: IUnidadeConsumidora[];
        this.unidadeConsumidoraService.getAll().subscribe(ucs => {
          unidades = ucs;

          this.faturas.forEach(fatura => {
            fatura.ucNome = unidades.filter((unidade) => {
              return unidade.id == fatura.unidadeConsumidoraId;
            })[0].nome;
          })
          
          this.isLoading = false;
        });
      });
  }

  async handleEditFatura(id: number) {
    await this.router.navigate(['/faturas/fatura'], {
      queryParams: {
        id
      }
    });
  }

  handleDeleteFatura(id: number, valor: string) {
    if (confirm("Deseja deletar a fatura de R$ " + valor + "?")) {
      this.faturaService.delete(id).subscribe(data => {
        this.loadData();
      })
    }
  }
}
