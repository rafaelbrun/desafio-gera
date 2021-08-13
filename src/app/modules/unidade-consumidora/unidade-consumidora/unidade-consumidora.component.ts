import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUnidadeConsumidora } from '@app/shared/interfaces/IUnidadeConsumidora';
import { UnidadeConsumidoraService } from '@app/shared/services/unidade-consumidora.service';
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-unidade-consumidora',
  templateUrl: './unidade-consumidora.component.html',
  styleUrls: ['./unidade-consumidora.component.scss']
})
export class UnidadeConsumidoraComponent implements OnInit {

  faCheck = faCheck;
  faArrowLeft = faArrowLeft

  unidadeConsumidoraEdit: IUnidadeConsumidora;

  formUnidadeConsumidora!: FormGroup;

  isLoading = false;
  hasError = false;
  isViewing = false;
  messageError: string = '';
  cancelButtonLabel: string = 'CANCELAR';
  inputDisabled = false;

  constructor(
    private formBuilder: FormBuilder,
    private unidadeConsumidoraService: UnidadeConsumidoraService,
    private router: Router,
    private actRouter: ActivatedRoute
  ) {
    this.setFormUnidadeConsummidora();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.actRouter.queryParams.subscribe(async (queryParams: any) => {
      if (queryParams.id) {
        this.isLoading = true;
        this.unidadeConsumidoraService.getById(queryParams.id).subscribe((unidade) => {
          this.unidadeConsumidoraEdit = unidade[0];
          this.isLoading = false;
          this.setFormUnidadeConsummidora(this.unidadeConsumidoraEdit);
        });
      }

      if (!queryParams.editing && queryParams.id) {
        this.isViewing = true;
        this.inputDisabled = true;
        this.cancelButtonLabel = 'VOLTAR';
      }
    });
  }

  setFormUnidadeConsummidora(uc?: IUnidadeConsumidora) {
    var ucForm: IUnidadeConsumidora;

    ucForm = uc || { nome: '', endereco: '', numero: '', distribuidora: '' };

    this.formUnidadeConsumidora = this.formBuilder.group({
      nome: [ucForm.nome, [Validators.required, Validators.maxLength(50)]],
      endereco: [ucForm.endereco, [Validators.required, Validators.maxLength(200)]],
      numero: [ucForm.numero, [Validators.required, Validators.maxLength(20)]],
      distribuidora: [ucForm.distribuidora, [Validators.required, Validators.maxLength(100)]]
    });
  }

  handleSaveUnidadeConsumidora() {
    if (this.formUnidadeConsumidora.valid) {
      this.isLoading = true;

      const ucSender: IUnidadeConsumidora = {
        nome: this.formUnidadeConsumidora.controls.nome.value,
        endereco: this.formUnidadeConsumidora.controls.endereco.value,
        numero: this.formUnidadeConsumidora.controls.numero.value,
        distribuidora: this.formUnidadeConsumidora.controls.distribuidora.value
      }
      
      if (this.unidadeConsumidoraEdit) {
        this.unidadeConsumidoraService.put(this.unidadeConsumidoraEdit.id, ucSender).subscribe(data => {
          this.isLoading = false;
          this.router.navigate(['/unidades-consumidoras']);
        });
        return;
      }
      this.unidadeConsumidoraService.post(ucSender).subscribe(data => {
        this.isLoading = false;
        this.router.navigate(['/unidades-consumidoras']);
      });
    }

    this.hasError = true;
    this.messageError = 'Informe os campos corretamente'
  }
}
