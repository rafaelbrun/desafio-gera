import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEye, faPencilAlt, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IUnidadeConsumidora } from 'src/app/shared/interfaces/IUnidadeConsumidora';
import { UnidadeConsumidoraService } from 'src/app/shared/services/unidade-consumidora.service';

@Component({
  selector: 'app-unidades-consumidora',
  templateUrl: './unidades-consumidora.component.html',
  styleUrls: ['./unidades-consumidora.component.scss']
})
export class UnidadesConsumidoraComponent implements OnInit {

  faEye = faEye;
  faPencil = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlus;

  unidadesConsumidora: IUnidadeConsumidora[];

  isLoading = false;

  constructor(
    private unidadeConsumidoraService: UnidadeConsumidoraService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.unidadeConsumidoraService.getAll()
      .subscribe((unidadesConsumidora: IUnidadeConsumidora[]) => {
        this.unidadesConsumidora = unidadesConsumidora;
        this.isLoading = false;
      });
  }

  async handleEditUnidadeConsumidora(id: number) {
    this.navigateToUnidadeConsumidora(id, true);
  }

  handleViewUnidadeConsumidora(id: number) {
    this.navigateToUnidadeConsumidora(id, false);
  }

  async navigateToUnidadeConsumidora(id: number, editing: boolean) {
    const queryParams = editing ? { id, editing } : { id };
    await this.router.navigate(['/unidades-consumidora/unidade-consumidora'], {
      queryParams
    });
  }

  handleDeleteUnidadeConsumidora(id: number, nome: string) {
    if (confirm("Deseja deletar a " + nome + "?")) {
      this.unidadeConsumidoraService.delete(id).subscribe(data => {
        this.loadData();
      })
    }
  }
}
