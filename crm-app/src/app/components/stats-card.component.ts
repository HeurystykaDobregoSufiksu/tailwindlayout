import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
  imports: [CommonModule],
  template: `
    <div [ngClass]="stat.gradient" class="rounded-xl p-4 text-white shadow-sm">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center space-x-2">
          <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <g [innerHTML]="getSafeIcon()"></g>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold">{{ stat.value }}</p>
            <p class="text-xs opacity-90">{{ stat.label }}</p>
          </div>
        </div>
        <span class="text-xs bg-white/20 px-2.5 py-1 rounded-full font-medium">{{ stat.change }}</span>
      </div>
    </div>
  `
})
export class StatsCardComponent {
  @Input() stat!: StatCard;

  constructor(private sanitizer: DomSanitizer) {}

  getSafeIcon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.stat.icon);
  }
}
