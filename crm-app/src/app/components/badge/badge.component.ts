import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export type BadgeVariant = 'default' | 'pill' | 'status';
export type BadgeColor = 'red' | 'amber' | 'emerald' | 'blue' | 'slate' | 'indigo' | 'white';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeConfig {
  label: string;
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  icon?: string;
  iconPosition?: 'left' | 'right';
  animated?: boolean;
}

@Component({
  selector: 'app-badge',
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss'
})
export class BadgeComponent {
  @Input() config!: BadgeConfig;

  private sanitizer = inject(DomSanitizer);

  getSafeIcon(): SafeHtml {
    return this.config.icon ? this.sanitizer.bypassSecurityTrustHtml(this.config.icon) : '';
  }
}
