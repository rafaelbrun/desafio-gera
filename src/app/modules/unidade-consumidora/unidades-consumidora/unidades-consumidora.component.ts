import { Component, OnInit } from '@angular/core';
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

  unidadesConsumidora: IUnidadeConsumidora[] = [];

  isLoading: boolean = false;

  constructor(
    private unidadeConsumidoraService: UnidadeConsumidoraService
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
}
