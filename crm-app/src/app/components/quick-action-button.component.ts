import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-quick-action-button',
  imports: [CommonModule],
  template: `
    <button
      (click)="onActionClick()"
      class="w-full bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" [innerHTML]="action.icon">
      </svg>
      <span>{{ action.label }}</span>
    </button>
  `
})
export class QuickActionButtonComponent {
  @Input() action!: QuickAction;
  @Output() actionClick = new EventEmitter<QuickAction>();

  onActionClick() {
    this.actionClick.emit(this.action);
  }
}
