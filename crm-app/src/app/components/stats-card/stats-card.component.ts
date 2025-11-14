import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BadgeComponent, BadgeConfig } from '../badge/badge.component';

export interface StatCard {
  id: string;
  value: string;
  label: string;
  change: string;
  icon: string;
  gradient: string;
}

@Component({
  selector: 'app-stats-card',
  imports: [CommonModule, BadgeComponent],
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.scss'
})
export class StatsCardComponent {
  @Input() stat!: StatCard;

  private sanitizer = inject(DomSanitizer);

  getSafeIcon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.stat.icon);
  }

  getChangeBadge(): BadgeConfig {
    return {
      label: this.stat.change,
      variant: 'pill',
      color: 'white',
      size: 'sm'
    };
  }
}
