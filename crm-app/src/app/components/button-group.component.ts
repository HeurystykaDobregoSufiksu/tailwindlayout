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
  template: `
    <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-1 flex">
      <button
        *ngFor="let option of options"
        (click)="onOptionClick(option)"
        [ngClass]="{
          'text-white bg-gradient-to-r from-indigo-600 to-indigo-700': option.active,
          'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-700': !option.active
        }"
        class="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm font-medium rounded-md transition-all">
        {{ option.label }}
      </button>
    </div>
  `
})
export class ButtonGroupComponent {
  @Input() options!: ButtonGroupOption[];
  @Output() optionSelected = new EventEmitter<ButtonGroupOption>();

  onOptionClick(option: ButtonGroupOption) {
    this.optionSelected.emit(option);
  }
}
