import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingRowComponent } from '../meeting-row/meeting-row.component';
import { CalendarWidgetComponent, CalendarDay } from '../calendar-widget/calendar-widget.component';

export interface Meeting {
  id: string;
  avatarUrl: string;
  personName: string;
  dateTimeLabel: string;
  locationLabel: string;
}

@Component({
  selector: 'app-dashboard-events',
  imports: [CommonModule, MeetingRowComponent, CalendarWidgetComponent],
  templateUrl: './dashboard-events.component.html',
  styleUrl: './dashboard-events.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardEventsComponent {
  meetings = input<Meeting[]>([]);
  currentMonthName = input<string>('January');
  calendarDays = input<CalendarDay[]>();
}
