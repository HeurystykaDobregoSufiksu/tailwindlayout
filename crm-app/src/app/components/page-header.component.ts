import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonGroupComponent, ButtonGroupOption } from './button-group.component';
import { PrimaryButtonComponent, PrimaryButtonConfig } from './primary-button.component';

@Component({
  selector: 'app-page-header',
  imports: [CommonModule, ButtonGroupComponent, PrimaryButtonComponent],
  template: `
    <div class="mb-6 sm:mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div class="mb-4 sm:mb-0">
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-1">{{ title }}</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">{{ subtitle }}</p>
        </div>
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <!-- View Toggle -->
          <app-button-group
            [options]="viewOptions"
            (optionSelected)="onViewChange($event)">
          </app-button-group>

          <!-- Action Button -->
          <app-primary-button
            *ngIf="actionButton"
            [config]="actionButton"
            (buttonClick)="onActionClick($event)">
          </app-primary-button>
        </div>
      </div>
    </div>
  `
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
