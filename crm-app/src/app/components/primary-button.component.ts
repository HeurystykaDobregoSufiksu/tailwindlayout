import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'primary' | 'secondary' | 'outline';

export interface PrimaryButtonConfig {
  id: string;
  label: string;
  icon?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
}

@Component({
  selector: 'app-primary-button',
  imports: [CommonModule],
  template: `
    <button
      (click)="onClick()"
      [disabled]="config.disabled"
      [ngClass]="{
        'px-4 py-2 text-sm': config.size === 'sm' || !config.size,
        'px-5 py-2.5 text-sm': config.size === 'md',
        'px-6 py-3 text-base': config.size === 'lg',
        'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-md hover:shadow-lg': config.variant === 'primary' || !config.variant,
        'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200': config.variant === 'secondary',
        'bg-transparent border-2 border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30': config.variant === 'outline',
        'opacity-50 cursor-not-allowed': config.disabled
      }"
      class="rounded-lg font-medium transition-all flex items-center justify-center space-x-2">
      <svg *ngIf="config.icon" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <g [innerHTML]="getSafeIcon()"></g>
      </svg>
      <span>{{ config.label }}</span>
    </button>
  `
})
export class PrimaryButtonComponent {
  @Input() config!: PrimaryButtonConfig;
  @Output() buttonClick = new EventEmitter<PrimaryButtonConfig>();

  constructor(private sanitizer: DomSanitizer) {}

  getSafeIcon(): SafeHtml {
    return this.config.icon ? this.sanitizer.bypassSecurityTrustHtml(this.config.icon) : '';
  }

  onClick() {
    if (!this.config.disabled) {
      this.buttonClick.emit(this.config);
    }
  }
}
