import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';



@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule
  ],
  exports: [
    InputComponent,
    ButtonComponent
  ]
})
export class ComponentsModule { }
