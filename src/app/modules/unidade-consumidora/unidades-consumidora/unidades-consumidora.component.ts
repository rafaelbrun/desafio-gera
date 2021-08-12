import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IFatura } from '@app/shared/interfaces/IFatura';
import { FaturaService } from '@app/shared/services/fatura.service';
import { validateDate } from '@app/shared/utils/validateDate';
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

  formFatura: FormGroup;

  unidadesConsumidora: IUnidadeConsumidora[];
  selectedUcId: number;

  isLoading = false;
  modelNewFatura = false;

  constructor(
    private unidadeConsumidoraService: UnidadeConsumidoraService,
    private faturaService: FaturaService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.setFormFatura();
  }

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

  setFormFatura() {
    this.formFatura = this.formBuilder.group({
      consumo: ['', Validators.required],
      valor: ['', Validators.required],
      data_de_vencimento: ['', Validators.required]
    });
  }

  async handleEditUnidadeConsumidora(id: number) {
    this.navigateToUnidadeConsumidora(id, true);
  }

  handleViewUnidadeConsumidora(id: number) {
    this.navigateToUnidadeConsumidora(id, false);
  }

  openNewFaturaModal(idUc: number) {
    this.modelNewFatura = true;
    this.selectedUcId = idUc;
  }

  handleAddFatura() {
    if (this.formFatura.valid && validateDate(this.formFatura.controls.data_de_vencimento.value)) {
      const faturaSender: IFatura = {
        consumo: this.formFatura.controls.consumo.value,
        valor: this.formFatura.controls.valor.value,
        data_de_vencimento: this.formFatura.controls.data_de_vencimento.value,
        unidadeConsumidoraId: this.selectedUcId
      };

      this.isLoading = true;
      this.faturaService.post(faturaSender).subscribe(data => {
        this.isLoading = false;
        this.modelNewFatura = false;
        this.loadData();
      });
    }
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
      });
    }
  }
}
