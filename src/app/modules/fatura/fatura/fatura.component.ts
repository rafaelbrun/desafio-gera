import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IFatura } from '@app/shared/interfaces/IFatura';
import { IUnidadeConsumidora } from '@app/shared/interfaces/IUnidadeConsumidora';
import { FaturaService } from '@app/shared/services/fatura.service';
import { UnidadeConsumidoraService } from '@app/shared/services/unidade-consumidora.service';
import { validateDate } from '@app/shared/utils/validateDate';
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-fatura',
  templateUrl: './fatura.component.html',
  styleUrls: ['./fatura.component.scss']
})
export class FaturaComponent implements OnInit {

  faCheck = faCheck;
  faArrowLeft = faArrowLeft;

  faturaEdit: IFatura;
  selectedUcId: number;
  unidadesConsumidoras: IUnidadeConsumidora[];

  formFatura: FormGroup;

  isLoading = false;
  hasError = false;
  messageError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private unidadeConsumidoraService: UnidadeConsumidoraService,
    private faturaService: FaturaService,
    private router: Router,
    private actRouter: ActivatedRoute
  ) {
    this.setFormFatura();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.actRouter.queryParams.subscribe(async (queryParams: any) => {
      if (queryParams.id) {
        this.isLoading = true;
        this.faturaService.getById(queryParams.id).subscribe((fatura) => {
          this.faturaEdit = fatura;
          this.isLoading = false;

          this.setFormFatura(this.faturaEdit, fatura.unidadeConsumidoraId);
        });
      }
    });

  }

  setFormFatura(fatura?: IFatura, idUc?: number) {
    this.unidadeConsumidoraService.getAll().subscribe(unidades => {
      this.unidadesConsumidoras = unidades;
      this.selectedUcId = idUc || this.unidadesConsumidoras[0].id;
    })
    var faturaForm;

    faturaForm = fatura || { consumo: '', valor: '', data_de_vencimento: '' };

    this.formFatura = this.formBuilder.group({
      consumo: [faturaForm.consumo, Validators.required],
      valor: [faturaForm.valor, Validators.required],
      data_de_vencimento: [faturaForm.data_de_vencimento, Validators.required]
    });
  }

  handleSaveUnidadeConsumidora() {
    if (this.formFatura.valid && validateDate(this.formFatura.controls.data_de_vencimento.value)) {
      const faturaSender: IFatura = {
        consumo: this.formFatura.controls.consumo.value,
        valor: this.formFatura.controls.valor.value,
        data_de_vencimento: this.formFatura.controls.data_de_vencimento.value,
        unidadeConsumidoraId: this.selectedUcId
      }
      this.isLoading = true;
      if (this.faturaEdit?.id) {
        this.faturaService.put(this.faturaEdit.id, faturaSender).subscribe(data => {
          this.isLoading = false;
          this.router.navigate(['/faturas']);
        });
        return;
      }
      this.faturaService.post(faturaSender).subscribe(data => {
        this.isLoading = false;
        this.router.navigate(['/faturas']);
      });
    }

    this.hasError = true;
    this.messageError = 'Informe os campos corretamente'
  }
}
