import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export type IconButtonVariant = 'default' | 'theme';

export interface IconButtonConfig {
  id: string;
  icon: string;
  ariaLabel: string;
  variant?: IconButtonVariant;
}

@Component({
  selector: 'app-icon-button',
  imports: [CommonModule],
  templateUrl: './icon-button.component.html',
  styleUrl: './icon-button.component.scss'
})
export class IconButtonComponent {
  @Input() config!: IconButtonConfig;
  @Output() buttonClick = new EventEmitter<IconButtonConfig>();

  private sanitizer = inject(DomSanitizer);

  getSafeIcon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.config.icon);
  }

  onClick() {
    this.buttonClick.emit(this.config);
  }
}
