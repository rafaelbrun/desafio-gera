import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { MessageErrorComponent } from './message-error/message-error.component';



@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    MessageErrorComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    MessageErrorComponent
  ]
})
export class ComponentsModule { }
