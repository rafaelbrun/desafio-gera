import { Component, OnInit } from '@angular/core';
import { IUnidadeConsumidora } from 'src/app/shared/interfaces/IUnidadeConsumidora';
import { UnidadeConsumidoraService } from 'src/app/shared/services/unidade-consumidora.service';

@Component({
  selector: 'app-unidades-consumidora',
  templateUrl: './unidades-consumidora.component.html',
  styleUrls: ['./unidades-consumidora.component.scss']
})
export class UnidadesConsumidoraComponent implements OnInit {

  unidadesConsumidora: IUnidadeConsumidora[] = [];

  constructor(
    private unidadeConsumidoraService: UnidadeConsumidoraService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.unidadeConsumidoraService.getAll()
      .subscribe((unidadesConsumidora: IUnidadeConsumidora[]) => this.unidadesConsumidora = unidadesConsumidora);
  }
}
