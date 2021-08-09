import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-unidade-consumidora',
  templateUrl: './unidade-consumidora.component.html',
  styleUrls: ['./unidade-consumidora.component.scss']
})
export class UnidadeConsumidoraComponent implements OnInit {

  faCheck = faCheck;
  faArrowLeft = faArrowLeft

  formUnidadeConsumidora!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
    ) {
      this.setFormUnidadeConsummidora();
   }

  ngOnInit(): void {
  }

  setFormUnidadeConsummidora() {
    this.formUnidadeConsumidora = this.formBuilder.group({
      nome: ['', Validators.required],
      endereco: ['', Validators.required],
      numero: ['', Validators.required],
      distribuidora: ['', Validators.required]
    });
  }
}
