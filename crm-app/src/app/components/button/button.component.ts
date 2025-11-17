import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'primary' | 'secondary' | 'outline';

export interface ButtonConfig {
  id: string;
  label: string;
  icon?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
}

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
    @Input() label = '';
  @Input() icon?: string;
  @Input() size: ButtonSize = 'md';
  @Input() variant: ButtonVariant = 'primary';
  @Input() disabled = false;
  
  @Output() buttonClick = new EventEmitter<void>();

  private sanitizer = inject(DomSanitizer);

  get safeIcon(): SafeHtml {
    return this.icon ? this.sanitizer.bypassSecurityTrustHtml(this.icon) : '';
  }

  onClick() {
    if (!this.disabled) {
      this.buttonClick.emit();
    }
  }
}
