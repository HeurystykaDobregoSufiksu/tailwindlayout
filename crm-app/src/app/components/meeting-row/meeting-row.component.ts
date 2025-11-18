import { Component, ChangeDetectionStrategy, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-meeting-row',
  imports: [CommonModule],
  templateUrl: './meeting-row.component.html',
  styleUrl: './meeting-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingRowComponent {
  avatarUrl = input.required<string>();
  personName = input.required<string>();
  dateTimeLabel = input.required<string>();
  locationLabel = input.required<string>();

  private sanitizer = inject(DomSanitizer);

  // Icons
  private calendarIconPath = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>';
  private mapPinIconPath = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>';
  private ellipsisIconPath = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>';

  get safeCalendarIcon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.calendarIconPath);
  }

  get safeMapPinIcon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.mapPinIconPath);
  }

  get safeEllipsisIcon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.ellipsisIconPath);
  }
}
