import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() iconName: IconDefinition | undefined;
  @Input() buttonLabel: string = '';
  @Input() type: string = 'orange';

  constructor() { }

  ngOnInit(): void {
  }

}
