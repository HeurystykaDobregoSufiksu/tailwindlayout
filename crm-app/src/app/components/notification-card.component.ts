import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type NotificationType = 'error' | 'warning' | 'info' | 'success';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  icon: string;
}

@Component({
  selector: 'app-notification-card',
  imports: [CommonModule],
  template: `
    <div
      (click)="onNotificationClick()"
      [ngClass]="{
        'bg-red-50/80 dark:bg-red-900/20 border-red-100 dark:border-red-800/40 hover:bg-red-50 dark:hover:bg-red-900/30': notification.type === 'error',
        'bg-amber-50/80 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800/40 hover:bg-amber-50 dark:hover:bg-amber-900/30': notification.type === 'warning',
        'bg-blue-50/80 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/40 hover:bg-blue-50 dark:hover:bg-blue-900/30': notification.type === 'info',
        'bg-emerald-50/80 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/40 hover:bg-emerald-50 dark:hover:bg-emerald-900/30': notification.type === 'success'
      }"
      class="border rounded-xl p-3 transition-all cursor-pointer">
      <div class="flex items-start space-x-3">
        <div
          [ngClass]="{
            'bg-red-100 dark:bg-red-900/40': notification.type === 'error',
            'bg-amber-100 dark:bg-amber-900/40': notification.type === 'warning',
            'bg-blue-100 dark:bg-blue-900/40': notification.type === 'info',
            'bg-emerald-100 dark:bg-emerald-900/40': notification.type === 'success'
          }"
          class="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center">
          <svg
            [ngClass]="{
              'text-red-600 dark:text-red-400': notification.type === 'error',
              'text-amber-600 dark:text-amber-400': notification.type === 'warning',
              'text-blue-600 dark:text-blue-400': notification.type === 'info',
              'text-emerald-600 dark:text-emerald-400': notification.type === 'success'
            }"
            class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" [innerHTML]="notification.icon">
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <p
            [ngClass]="{
              'text-red-900 dark:text-red-300': notification.type === 'error',
              'text-amber-900 dark:text-amber-300': notification.type === 'warning',
              'text-blue-900 dark:text-blue-300': notification.type === 'info',
              'text-emerald-900 dark:text-emerald-300': notification.type === 'success'
            }"
            class="text-sm font-semibold truncate">{{ notification.title }}</p>
          <p
            [ngClass]="{
              'text-red-700 dark:text-red-400': notification.type === 'error',
              'text-amber-700 dark:text-amber-400': notification.type === 'warning',
              'text-blue-700 dark:text-blue-400': notification.type === 'info',
              'text-emerald-700 dark:text-emerald-400': notification.type === 'success'
            }"
            class="text-xs mt-0.5">{{ notification.message }}</p>
          <p
            [ngClass]="{
              'text-red-500': notification.type === 'error',
              'text-amber-500': notification.type === 'warning',
              'text-blue-500': notification.type === 'info',
              'text-emerald-500': notification.type === 'success'
            }"
            class="text-xs mt-1">{{ notification.time }}</p>
        </div>
      </div>
    </div>
  `
})
export class NotificationCardComponent {
  @Input() notification!: Notification;
  @Output() notificationClick = new EventEmitter<Notification>();

  onNotificationClick() {
    this.notificationClick.emit(this.notification);
  }
}
