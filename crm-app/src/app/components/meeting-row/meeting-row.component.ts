import { Component, ChangeDetectionStrategy, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {DropdownButtonComponent} from '../dropdown-button/dropdown-button.component';
import {DropdownOptionComponent} from '../dropdown-option/dropdown-option.component';

@Component({
  selector: 'app-meeting-row',
  imports: [CommonModule, DropdownButtonComponent, DropdownOptionComponent],
  templateUrl: './meeting-row.component.html',
  styleUrl: './meeting-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingRowComponent {
  avatarUrl = input.required<string>();
  personName = input.required<string>();
  dateTimeLabel = input.required<string>();
  locationLabel = input.required<string>();
  icon='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">\n' +
    '  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />\n' +
    '</svg>'
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
