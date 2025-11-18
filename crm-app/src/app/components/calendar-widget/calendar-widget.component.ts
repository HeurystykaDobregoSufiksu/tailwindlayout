import { Component, ChangeDetectionStrategy, input, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export type DayState = 'standard' | 'muted' | 'selected';

export interface CalendarDay {
  day: number;
  state: DayState;
}

@Component({
  selector: 'app-calendar-widget',
  imports: [CommonModule],
  templateUrl: './calendar-widget.component.html',
  styleUrl: './calendar-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarWidgetComponent {
  currentMonthName = input.required<string>();
  days = input<CalendarDay[]>([
    // Previous month (muted)
    { day: 29, state: 'muted' },
    { day: 30, state: 'muted' },
    { day: 31, state: 'muted' },
    // Current month
    { day: 1, state: 'standard' },
    { day: 2, state: 'standard' },
    { day: 3, state: 'standard' },
    { day: 4, state: 'standard' },
    { day: 5, state: 'standard' },
    { day: 6, state: 'standard' },
    { day: 7, state: 'standard' },
    { day: 8, state: 'standard' },
    { day: 9, state: 'standard' },
    { day: 10, state: 'standard' },
    { day: 11, state: 'standard' },
    { day: 12, state: 'standard' },
    { day: 13, state: 'standard' },
    { day: 14, state: 'standard' },
    { day: 15, state: 'selected' },
    { day: 16, state: 'standard' },
    { day: 17, state: 'standard' },
    { day: 18, state: 'standard' },
    { day: 19, state: 'standard' },
    { day: 20, state: 'standard' },
    { day: 21, state: 'standard' },
    { day: 22, state: 'standard' },
    { day: 23, state: 'standard' },
    { day: 24, state: 'standard' },
    { day: 25, state: 'standard' },
    { day: 26, state: 'standard' },
    { day: 27, state: 'standard' },
    { day: 28, state: 'standard' },
    { day: 29, state: 'standard' },
    { day: 30, state: 'standard' },
    // Next month (muted)
    { day: 1, state: 'muted' },
    { day: 2, state: 'muted' },
    { day: 3, state: 'muted' },
  ]);

  dayHeaders = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  private sanitizer = inject(DomSanitizer);

  // Icons
  private chevronLeftPath = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>';
  private chevronRightPath = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>';

  get safeChevronLeft(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.chevronLeftPath);
  }

  get safeChevronRight(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.chevronRightPath);
  }

  getDayClasses(state: DayState): string {
    const baseClasses = 'flex items-center justify-center h-10 w-10 rounded-full text-sm transition-colors-base';

    const stateClasses = {
      standard: 'text-primary hover:bg-gray-100 dark:hover:bg-gray-700',
      muted: 'text-muted',
      selected: 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-semibold'
    };

    return `${baseClasses} ${stateClasses[state]}`;
  }
}
