import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
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
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.scss'
})
export class PrimaryButtonComponent {
  @Input() config!: PrimaryButtonConfig;
  @Output() buttonClick = new EventEmitter<PrimaryButtonConfig>();

  private sanitizer = inject(DomSanitizer);

  getSafeIcon(): SafeHtml {
    return this.config.icon ? this.sanitizer.bypassSecurityTrustHtml(this.config.icon) : '';
  }

  onClick() {
    if (!this.config.disabled) {
      this.buttonClick.emit(this.config);
    }
  }
}
