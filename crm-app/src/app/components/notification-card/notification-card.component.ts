import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.scss'
})
export class NotificationCardComponent {
  @Input() notification!: Notification;
  @Output() notificationClick = new EventEmitter<Notification>();

  private sanitizer = inject(DomSanitizer);

  getSafeIcon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.notification.icon);
  }

  onNotificationClick() {
    this.notificationClick.emit(this.notification);
  }
}
