import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IFatura } from '@app/shared/interfaces/IFatura';
import { IUnidadeConsumidora } from '@app/shared/interfaces/IUnidadeConsumidora';
import { FaturaService } from '@app/shared/services/fatura.service';
import { UnidadeConsumidoraService } from '@app/shared/services/unidade-consumidora.service';
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
  ucIdSelected: number;
  unidadesConsumidora: IUnidadeConsumidora[];

  formUnidadeConsumidora: FormGroup;

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
          this.faturaEdit = fatura[0];
          this.isLoading = false;
          this.setFormFatura(this.faturaEdit);
        });
      }
    });
    this.unidadeConsumidoraService.getAll().subscribe(unidades => {
      this.unidadesConsumidora = unidades;
      this.ucIdSelected = unidades[0].id;
    })
  }

  setFormFatura(fatura?: IFatura) {
    var faturaForm;

    faturaForm = fatura || { consumo: '', valor: '', data_de_vencimento: '' };

    this.formUnidadeConsumidora = this.formBuilder.group({
      consumo: [faturaForm.consumo, Validators.required],
      valor: [faturaForm.valor, Validators.required],
      data_de_vencimento: [faturaForm.data_de_vencimento, Validators.required]
    });
  }

  handleSaveUnidadeConsumidora() {
    if (this.formUnidadeConsumidora.valid) {
      const faturaSender: IFatura = {
        consumo: this.formUnidadeConsumidora.controls.consumo.value,
        valor: this.formUnidadeConsumidora.controls.valor.value,
        data_de_vencimento: this.formUnidadeConsumidora.controls.data_de_vencimento.value,
        unidadeConsumidoraId: this.ucIdSelected
      }
      this.isLoading = true;
      if (this.faturaEdit.id) {
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

  handleChangeSelect(element: any) {
    console.log(element.value);
    console.log(this.ucIdSelected);
  }
}
