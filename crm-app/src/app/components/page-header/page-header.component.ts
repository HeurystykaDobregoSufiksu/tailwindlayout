import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonGroupComponent, ButtonGroupOption } from '../button-group/button-group.component';
import { ButtonComponent, ButtonConfig } from '../button/button.component';

@Component({
  selector: 'app-page-header',
  imports: [CommonModule, ButtonGroupComponent, ButtonComponent],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() viewOptions!: ButtonGroupOption[];
  @Input() actionButton?: ButtonConfig;

  @Output() viewChange = new EventEmitter<ButtonGroupOption>();
  @Output() actionClick = new EventEmitter<void>();

  onViewChange(option: ButtonGroupOption) {
    this.viewChange.emit(option);
  }

  onActionClick() {
    this.actionClick.emit();
  }
}
