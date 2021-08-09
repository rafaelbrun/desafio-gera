import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-message-error',
  templateUrl: './message-error.component.html',
  styleUrls: ['./message-error.component.scss']
})
export class MessageErrorComponent {

  @Input() form: FormGroup;
  @Input() field: string;

  constructor() { }

  isInvalid() {
    try {
      return !this.form.get(this.field).valid && this.form.get(this.field).touched;
    } catch (error) {
      return false;
    }
  }

  message() {
    let message = 'Informação inválida';

    if (this.form.get(this.field).errors.required) {
      message = 'Campo obrigatório';
    }
    if (this.form.get(this.field).errors.maxlength) {
      message = 'Excede o número de caracteres permitido';
    }

    return message;
  }
}
