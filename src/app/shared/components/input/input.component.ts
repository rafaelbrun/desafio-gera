import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input() label: string = '';
  @Input() parentForm!: FormGroup;
  @Input() type: string = 'text';
  @Input() inputFormName: string = '';
  @Input() disabled: boolean;
}
