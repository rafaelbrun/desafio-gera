import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUnidadeConsumidora } from '@app/shared/interfaces/IUnidadeConsumidora';
import { StorageService } from '@app/shared/services/storage.service';
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
    private actRouter: ActivatedRoute,
    private storageService: StorageService
  ) {
    this.setFormUnidadeConsummidora();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.actRouter.queryParams.subscribe(async (queryParams: any) => {
      if (queryParams.editing || queryParams.viewing) {
        this.unidadeConsumidoraEdit = this.storageService.getValue();
      }

      if (queryParams.viewing) {
        this.isViewing = true;
        this.inputDisabled = true;
        this.cancelButtonLabel = 'VOLTAR';
      }

      if (this.unidadeConsumidoraEdit) {
        this.setFormUnidadeConsummidora(this.unidadeConsumidoraEdit);
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
      const ucSender: IUnidadeConsumidora = {
        nome: this.formUnidadeConsumidora.controls.nome.value,
        endereco: this.formUnidadeConsumidora.controls.endereco.value,
        numero: this.formUnidadeConsumidora.controls.numero.value,
        distribuidora: this.formUnidadeConsumidora.controls.distribuidora.value
      }
      this.isLoading = true;
      if (this.unidadeConsumidoraEdit.id) {
        this.unidadeConsumidoraService.put(this.unidadeConsumidoraEdit.id, ucSender).subscribe(data => {
          this.isLoading = false;
          this.router.navigate(['/unidades-consumidora']);
        });
        return;
      }
      this.unidadeConsumidoraService.post(ucSender).subscribe(data => {
        this.isLoading = false;
        this.router.navigate(['/unidades-consumidora']);
      });
    }

    this.hasError = true;
    this.messageError = 'Informe os campos corretamente'
  }
}
