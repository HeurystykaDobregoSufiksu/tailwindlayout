import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export type ActivityType = 'completion' | 'start' | 'comment' | 'update';

export interface Activity {
  id: string;
  type: ActivityType;
  user: string;
  action: string;
  target: string;
  time: string;
  iconBg: string;
  iconColor: string;
  targetColor: string;
  icon: string;
}

@Component({
  selector: 'app-activity-item',
  imports: [CommonModule],
  templateUrl: './activity-item.component.html',
  styleUrl: './activity-item.component.scss'
})
export class ActivityItemComponent {
  @Input() activity!: Activity;

  private sanitizer = inject(DomSanitizer);

  getSafeIcon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.activity.icon);
  }
}
