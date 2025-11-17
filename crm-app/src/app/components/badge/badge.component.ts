import { Component, Input, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export type BadgeVariant = 'default' | 'pill' | 'status';
export type BadgeColor = 'red' | 'amber' | 'emerald' | 'blue' | 'slate' | 'indigo' | 'white' | 'defaultLight' | 'defaultDark';
export type BadgeSize = 'sm' | 'md' | 'lg';


@Component({
  selector: 'app-badge',
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss'
})
export class BadgeComponent {

  label = input.required<string>();
  variant = input<BadgeVariant>();
  firstName = input<string>();
  color = input<string>();
  size = input<string>();
  icon = input<string>();
  bold = input<boolean>();
  iconPosition = input<string>();
  animated = input<boolean>();
  transparent = input<boolean>();
  private sanitizer = inject(DomSanitizer);

  getSafeIcon(): SafeHtml {
    return this.icon() ? this.sanitizer.bypassSecurityTrustHtml(this.icon()??"") : '';
  }
}
