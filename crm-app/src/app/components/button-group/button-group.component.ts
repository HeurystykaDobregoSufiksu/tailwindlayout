import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ButtonGroupOption {
  id: string;
  label: string;
  active?: boolean;
}

@Component({
  selector: 'app-button-group',
  imports: [CommonModule],
  templateUrl: './button-group.component.html',
  styleUrl: './button-group.component.scss'
})
export class ButtonGroupComponent {
  @Input() options!: ButtonGroupOption[];
  @Output() optionSelected = new EventEmitter<ButtonGroupOption>();

  onOptionClick(option: ButtonGroupOption) {
    this.optionSelected.emit(option);
  }
}
