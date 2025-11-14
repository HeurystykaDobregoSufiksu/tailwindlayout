import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface NavButton {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
}

@Component({
  selector: 'app-nav-button',
  imports: [CommonModule],
  template: `
    <button
      (click)="onClick()"
      [ngClass]="{
        'text-white bg-gradient-to-r from-indigo-600 to-indigo-700 shadow-sm': button.active,
        'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30': !button.active
      }"
      class="flex items-center px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all">
      <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" [innerHTML]="button.icon">
      </svg>
      {{ button.label }}
    </button>
  `
})
export class NavButtonComponent {
  @Input() button!: NavButton;
  @Output() buttonClick = new EventEmitter<NavButton>();

  onClick() {
    this.buttonClick.emit(this.button);
  }
}
