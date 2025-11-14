import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserInfoCardComponent, UserInfo } from './components/user-info-card.component';
import { NotificationCardComponent, Notification } from './components/notification-card.component';
import { QuickActionButtonComponent, QuickAction } from './components/quick-action-button.component';
import { KanbanColumnComponent, KanbanColumn } from './components/kanban-column.component';
import { KanbanTask } from './components/kanban-card.component';
import { ActivityItemComponent, Activity } from './components/activity-item.component';
import { StatsCardComponent, StatCard } from './components/stats-card.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    UserInfoCardComponent,
    NotificationCardComponent,
    QuickActionButtonComponent,
    KanbanColumnComponent,
    ActivityItemComponent,
    StatsCardComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  isMobileMenuOpen = false;
  isDarkMode = false;

  // User data
  userInfo: UserInfo = {
    initials: 'JK',
    name: 'Jan Kowalski',
    role: 'Doradca Klienta',
    location: 'Warszawa Centrum',
    stats: {
      clients: 24,
      tasks: 4,
      performance: 92
    }
  };

  // Notifications
  notifications: Notification[] = [
    {
      id: '1',
      type: 'error',
      title: 'Pilny kontakt',
      message: 'Klient wymaga kontaktu',
      time: '5 min temu',
      icon: '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Nowa kampania',
      message: 'Rozpoczyna się jutro',
      time: '1 godz. temu',
      icon: '<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>'
    }
  ];

  // Quick actions
  quickActions: QuickAction[] = [
    {
      id: '1',
      label: 'Nowy klient',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>'
    },
    {
      id: '2',
      label: 'Generuj raport',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>'
    }
  ];

  // Kanban columns
  kanbanColumns: KanbanColumn[] = [
    {
      id: 'todo',
      title: 'Do zrobienia',
      status: 'todo',
      tasks: [
        {
          id: '1',
          title: 'Przygotować ofertę kredytu',
          description: 'Przygotować kompleksową ofertę kredytu hipotecznego dla klienta premium',
          priority: 'high',
          status: 'todo',
          assignee: {
            initials: 'JN',
            name: 'Jan Nowak',
            color: 'linear-gradient(to bottom right, #3b82f6, #2563eb)'
          },
          dueDate: '15 lis'
        },
        {
          id: '2',
          title: 'Weryfikacja dokumentów',
          description: 'Sprawdzić kompletność dokumentów dla wniosku kredytowego',
          priority: 'medium',
          status: 'todo',
          assignee: {
            initials: 'AK',
            name: 'Anna Kowalska',
            color: 'linear-gradient(to bottom right, #ec4899, #db2777)'
          },
          dueDate: '16 lis'
        }
      ]
    },
    {
      id: 'in-progress',
      title: 'W trakcie',
      status: 'in-progress',
      tasks: [
        {
          id: '3',
          title: 'Spotkanie z klientem',
          description: 'Omówienie warunków kredytu i podpisanie wstępnej umowy',
          priority: 'high',
          status: 'in-progress',
          assignee: {
            initials: 'PW',
            name: 'Piotr Wiśniewski',
            color: 'linear-gradient(to bottom right, #10b981, #059669)'
          },
          dueDate: 'Dzisiaj',
          progressTime: '02:34:15'
        }
      ]
    },
    {
      id: 'done',
      title: 'Wykonane',
      status: 'done',
      tasks: [
        {
          id: '4',
          title: 'Założenie konta oszczędnościowego',
          description: 'Otwarcie nowego konta oszczędnościowego dla klienta',
          priority: 'low',
          status: 'done',
          assignee: {
            initials: 'MN',
            name: 'Maria Nowak',
            color: 'linear-gradient(to bottom right, #a855f7, #9333ea)'
          },
          dueDate: '12 lis'
        }
      ]
    }
  ];

  // Activities
  activities: Activity[] = [
    {
      id: '1',
      type: 'completion',
      user: 'Maria Nowak',
      action: 'zakończyła zadanie',
      target: 'Założenie konta',
      time: '2 godziny temu',
      iconBg: '#ddd6fe',
      iconColor: '#7c3aed',
      targetColor: '#7c3aed',
      icon: '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>'
    },
    {
      id: '2',
      type: 'start',
      user: 'Piotr Wiśniewski',
      action: 'rozpoczął zadanie',
      target: 'Spotkanie z klientem',
      time: '4 godziny temu',
      iconBg: '#bfdbfe',
      iconColor: '#2563eb',
      targetColor: '#2563eb',
      icon: '<path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>'
    },
    {
      id: '3',
      type: 'comment',
      user: 'Jan Nowak',
      action: 'dodał komentarz do',
      target: 'Oferta kredytu',
      time: '5 godzin temu',
      iconBg: '#fde68a',
      iconColor: '#d97706',
      targetColor: '#d97706',
      icon: '<path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>'
    }
  ];

  // Mobile stats (for mobile sidebar)
  mobileStats: StatCard[] = [
    {
      id: '1',
      value: '1,234',
      label: 'Sprzedaż',
      change: '+12%',
      icon: '<path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>',
      gradient: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      id: '2',
      value: '432K',
      label: 'Przychody',
      change: '+5%',
      icon: '<path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>',
      gradient: 'bg-gradient-to-br from-emerald-500 to-emerald-600'
    }
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.isDarkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);
    this.applyTheme();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    // Toggle body scroll
    if (this.isMobileMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  toggleTheme() {
    console.log('Toggle theme called, current mode:', this.isDarkMode);
    this.isDarkMode = !this.isDarkMode;
    console.log('New mode:', this.isDarkMode);
    this.applyTheme();
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.cdr.detectChanges();
  }

  private applyTheme() {
    const htmlElement = document.documentElement;
    console.log('Applying theme, dark mode:', this.isDarkMode);

    if (this.isDarkMode) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }

    console.log('HTML classes after apply:', htmlElement.classList.toString());
  }

  // Event handlers
  onNotificationClick(notification: Notification) {
    console.log('Notification clicked:', notification);
  }

  onQuickActionClick(action: QuickAction) {
    console.log('Quick action clicked:', action);
  }

  onTaskClick(task: KanbanTask) {
    console.log('Task clicked:', task);
  }
}
