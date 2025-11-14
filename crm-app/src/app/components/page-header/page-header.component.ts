import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonGroupComponent, ButtonGroupOption } from '../button-group/button-group.component';
import { PrimaryButtonComponent, PrimaryButtonConfig } from '../primary-button/primary-button.component';

@Component({
  selector: 'app-page-header',
  imports: [CommonModule, ButtonGroupComponent, PrimaryButtonComponent],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() viewOptions!: ButtonGroupOption[];
  @Input() actionButton?: PrimaryButtonConfig;

  @Output() viewChange = new EventEmitter<ButtonGroupOption>();
  @Output() actionClick = new EventEmitter<PrimaryButtonConfig>();

  onViewChange(option: ButtonGroupOption) {
    this.viewChange.emit(option);
  }

  onActionClick(button: PrimaryButtonConfig) {
    this.actionClick.emit(button);
  }
}
