import { Component, OnInit, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserInfoCardComponent, UserInfo } from './components/user-info-card/user-info-card.component';
import { NotificationCardComponent, Notification } from './components/notification-card/notification-card.component';
import { QuickActionButtonComponent, QuickAction } from './components/quick-action-button/quick-action-button.component';
import { KanbanColumnComponent, KanbanColumn } from './components/kanban-column/kanban-column.component';
import { KanbanTask } from './components/kanban-card/kanban-card.component';
import { ActivityItemComponent, Activity } from './components/activity-item/activity-item.component';
import { StatsCardComponent, StatCard } from './components/stats-card/stats-card.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { NavButton } from './components/nav-button/nav-button.component';
import { IconButtonConfig } from './components/icon-button/icon-button.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { ButtonGroupOption, ButtonGroupComponent } from './components/button-group/button-group.component';
import { ButtonConfig, ButtonComponent } from './components/button/button.component';
import { BadgeComponent } from "./components/badge/badge.component";
import { EmptyStateInfo } from "./components/empty-state-info/empty-state-info";
import { KampaniaCardHeader } from "./components/kampania-card-header/kampania-card-header";
import { DropdownButtonComponent } from "./components/dropdown-button/dropdown-button.component";
import { DropdownOptionComponent } from "./components/dropdown-option/dropdown-option.component";
import { DashboardEventsComponent, Meeting } from "./components/dashboard-events/dashboard-events.component";
import { CalendarDay } from "./components/calendar-widget/calendar-widget.component";

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
    TopBarComponent,
    PageHeaderComponent,
    ButtonGroupComponent,
    ButtonComponent,
    BadgeComponent,
    EmptyStateInfo,
    KampaniaCardHeader,
    DropdownButtonComponent,
    DropdownOptionComponent,
    DashboardEventsComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App implements OnInit {
navigate(_t25: NavButton) {
throw new Error('Method not implemented.');
}
onOperatorChange(option: ButtonGroupOption) {
this.operatorOptions.update(options =>
      options.map(o => ({
        ...o,
        active: o.id === option.id
      }))
    );
}
  // Signals for reactive state
  isMobileMenuOpen = signal(false);
  isDarkMode = signal(false);
  startDate = signal(new Date);
  randomArr = signal<string[]>(['dsa','sad','zxc','xzcv','dsa','sad','zxc','xzcv']);
  btnConfig = signal<IconButtonConfig[]>([]);
  // Navigation buttons
  navButtons = signal<NavButton[]>([
    {
      id: 'user',
      label: 'Użytkownik',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>',
      active: true
    },
    {
      id: 'customer-service',
      label: 'Obsługa Klienta',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>'
    },
    {
      id: 'communication',
      label: 'Komunikacja',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>'
    },
    {
      id: 'offers',
      label: 'Oferty',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>'
    },
    {
      id: 'plans',
      label: 'Plany marketingowe',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" /> </svg>'
    },
    {
      id: 'settings',
      label: 'Ustawienia',
      icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>'
    }
  ]);

  // Mobile menu button - using computed signal
  mobileMenuButton = computed<IconButtonConfig>(() => ({
    id: 'mobile-menu',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>',
    ariaLabel: 'Toggle mobile menu'
  }));

  // Theme button - using computed signal that depends on isDarkMode
  themeButton = computed<IconButtonConfig>(() => ({
    id: 'theme-toggle',
    icon: this.isDarkMode()
      ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>'
      : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>',
    ariaLabel: 'Toggle theme',
    variant: 'theme'
  }));

  // Page header config
  pageTitle = signal('Tablica Zadań');
  
  pageSubtitle = signal('Zarządzaj swoimi zadaniami i projektami');

  // View options
  viewOptions = signal<ButtonGroupOption[]>([
    { id: 'kanban', label: 'Kanban', active: true },
    { id: 'list', label: 'Lista', active: false },
    { id: 'calendar', label: 'Kalendarz', active: false }
  ]);
 operatorOptions = signal<ButtonGroupOption[]>([
    { id: 'operator', label: 'Operator', active: true },
    { id: 'Dyrektor', label: 'Dyrektor', active: false },
    { id: 'Centrala', label: 'Centrala', active: false }
  ]);
  // Add task button
  addTaskButton = computed<ButtonConfig>(() => ({
    id: 'add-task',
    label: 'Dodaj zadanie',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>',
    variant: 'primary',
    size: 'md'
  }));
 
  // User data
  userInfo = signal<UserInfo>({
    initials: 'JK',
    name: 'Jan Kowalski',
    role: 'Doradca Klienta',
    location: 'Warszawa Centrum',
    stats: {
      clients: 24,
      tasks: 4,
      performance: 92
    }
  });

  // Notifications
  notifications = signal<Notification[]>([
    {
      id: '1',
      type: 'error',
      title: 'Pilny kontakt',
      message: 'Klient wymaga kontaktu',
      time: '5 min temu',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /> </svg>'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Nowa kampania',
      message: 'Rozpoczyna się jutro',
      time: '1 godz. temu',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /> </svg>'
    }
  ]);

  // Quick actions
  quickActions = signal<QuickAction[]>([
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
  ]);

  // Kanban columns
  kanbanColumns = signal<KanbanColumn[]>([
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
  ]);

  // Activities
  activities = signal<Activity[]>([
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
      icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" /> </svg>'
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
      icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" /> </svg>'
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
      icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" /> </svg>'
    }
  ]);

  // Mobile stats (for mobile sidebar)
  mobileStats = signal<StatCard[]>([
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
  ]);

  // Icons for dropdown examples
  editIcon = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>';
  deleteIcon = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>';
  shareIcon = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>';
  downloadIcon = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>';
  settingsIcon = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>';
  actionsIcon = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>';

  // Dashboard Events data
  upcomingMeetings = signal<Meeting[]>([
    {
      id: '1',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      personName: 'Anna Kowalska',
      dateTimeLabel: 'Nov 18, 2:00 PM',
      locationLabel: 'Conference Room A'
    },
    {
      id: '2',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      personName: 'Piotr Wiśniewski',
      dateTimeLabel: 'Nov 18, 4:30 PM',
      locationLabel: 'Virtual Meeting'
    },
    {
      id: '3',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      personName: 'Maria Nowak',
      dateTimeLabel: 'Nov 19, 10:00 AM',
      locationLabel: 'Main Office'
    },
    {
      id: '4',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      personName: 'Jan Kowalczyk',
      dateTimeLabel: 'Nov 19, 3:00 PM',
      locationLabel: 'Client Site'
    }
  ]);

  currentMonth = signal<string>('November');

  calendarDaysData = signal<CalendarDay[]>([
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
    { day: 15, state: 'standard' },
    { day: 16, state: 'standard' },
    { day: 17, state: 'standard' },
    { day: 18, state: 'selected' },
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

  ngOnInit() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.isDarkMode.set(savedTheme === 'dark' || (!savedTheme && prefersDark));
    this.applyTheme();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(open => !open);

    // Toggle body scroll
    if (this.isMobileMenuOpen()) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }

  toggleTheme() {
    console.log('Toggle theme called, current mode:', this.isDarkMode());
    this.isDarkMode.update(dark => !dark);
    console.log('New mode:', this.isDarkMode());
    this.applyTheme();
    localStorage.setItem('theme', this.isDarkMode() ? 'dark' : 'light');
  }

  private applyTheme() {
    const htmlElement = document.documentElement;
    console.log('Applying theme, dark mode:', this.isDarkMode());

    if (this.isDarkMode()) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }

    console.log('HTML classes after apply:', htmlElement.classList.toString());
  }

  // Event handlers
  onNavButtonClick(button: NavButton) {
    console.log('Nav button clicked:', button);
    // Update active state using signals
    this.navButtons.update(buttons =>
      buttons.map(b => ({
        ...b,
        active: b.id === button.id
      }))
    );
  }

  onViewChange(option: ButtonGroupOption) {
    console.log('View changed:', option);
    // Update active state using signals
    this.viewOptions.update(options =>
      options.map(o => ({
        ...o,
        active: o.id === option.id
      }))
    );
  }

  onAddTaskClick() {
    console.log('Add task clicked:');
  }

  onNotificationClick(notification: Notification) {
    console.log('Notification clicked:', notification);
  }

  onQuickActionClick(action: QuickAction) {
    console.log('Quick action clicked:', action);
  }

  onTaskClick(task: KanbanTask) {
    console.log('Task clicked:', task);
  }

  onDropdownOptionClick(optionId: string) {
    console.log('Dropdown option clicked:', optionId);
  }
}
